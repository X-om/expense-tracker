const express = require("express");
const authMiddleware = require("../middleware");
const zod = require("zod");
const { Account, Expense, User } = require("../db");
const accountRouter = express.Router();
const mongoose = require("mongoose");

const exportRouter = require("./export");

accountRouter.use("/exportexpense",exportRouter);

const accountInfoSchema = zod.object({
    income: zod.number()
        .min(0, { message: "income cannot be less than zero, please enter the income" })
        .max(250000, { message: "Monthly income cannot exceed 250000" }),

    balance: zod.number()
        .min(0, { message: "balance cannot be less than zero, please enter balance" }),

    budget: zod.number()
        .min(0, { message: "budget cannot be less than zero" }),

    date: zod.string().transform((val) => new Date(val)).optional()
});

function accountInfoInputValidation(req, res, next) {
    try {
        const response = accountInfoSchema.safeParse(req.body);
        if (!response.success) {
            const errors = response.error.errors.map((err) => ({
                path: err.path,
                message: err.message
            }));

            return res.status(400).json(errors);
        }

        if (req.body.balance > req.body.income) {
            return res.status(400).json({
                path: ["balance"],
                message: "blance cannot exceed income"
            });
        }
        if (req.body.budget > req.body.balance) {
            return res.status(400).json({
                path: ["budget"],
                message: "budget cannot exceed balance"
            });
        }

        next();
    } catch (error) {
        console.log(`error during zod ${error}`);
        return res.status(500).json({ message: "internal zod error" });
    }
}

async function storeAccountInfo(req, res, next) {
    const userId = req.userId;
    const payload = req.body;
    
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const account = await Account.findOne({userId},{hasData:1}).session(session);
        if(!account){
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json({
                message : "Something went wrong !"
            })
        }
        if(account.hasData !== false){
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({
                message : "Account info is already added"
            });
        }   
        
        await Account.updateOne({userId} , 
            {
                hasData : true,
                income : payload.income,
                initialBalance : payload.balance,
                balance : payload.balance,
                budget : payload.budget,
                date : Date.now(),
            }).session(session);
        
        await session.commitTransaction();
        session.endSession();

        next();
    } catch (error) {
        console.log(`error while storing account info in database ${error}`);
        return res.status(500).json({ message: "internal server error" });
    }
}

accountRouter.post("/addaccountinfo", authMiddleware, accountInfoInputValidation, storeAccountInfo, (req, res) => {
    res.json({ message: "account info stored successfully" });
})


accountRouter.get("/currentinfo", authMiddleware, async (req, res) => {
    try {
        const accountInfo = await Account.findOne({ userId: req.userId }, { _id: 0, userId: 0, __v: 0 });
        if (!accountInfo) {
            return res.status(404).json({
                message: "Account information is not added"
            })
        }
        res.json(accountInfo);

    } catch (error) {
        console.log(`error during fetching account data ${error}`)
        return res.status(500).json({
            message: "internal server error"
        })
    }

})


const expenseValidationSchema = zod.object({
    amount: zod.number().min(0, { message: "please enter the spend amount" }),
    category: zod.enum(['food', 'subscription', 'shopping', 'rent', 'bill', 'travel', 'other'], {
        errorMap: () => ({ message: "please select valid category" })
    }),
    description: zod.string().min(0, { message: "please enter the description" }).optional(),
    spendDate: zod.string().transform((val) => new Date(val)),
    createdAt: zod.string().transform((val) => new Date(val)).optional(),
    isRecurring : zod.boolean().optional()
})

function validateExpenseInput(req, res, next) {
    const response = expenseValidationSchema.safeParse(req.body);
    if (!response.success) {
        const errors = response.error.errors.map(err => ({
            path: err.path,
            message: err.message
        }));

        return res.status(400).json(errors);
    }
    next();
}

const getFirstDayOfNextMonth = (date) => {
    const givenDate = new Date(date);
    return new Date(givenDate.getFullYear(), givenDate.getMonth() + 1, 1);
}
const getFirstDayOfMonth = (date) => {
    const givenDate = new Date(date);
    return new Date(givenDate.getFullYear(), givenDate.getMonth(), 1);
}

async function storeExpense(req, res, next) {
    const userId = req.userId;
    let responsePayload = {};
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const accountInfo = await Account.findOne(
            { userId },
            { _id: 1, balance: 1, budget: 1, totalSpend: 1, date: 1 }
        ).session(session);

        if (!accountInfo) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Account does not exist" });
        }

        const { amount, category, description, spendDate, createdAt, isRecurring } = req.body;
    ;


        const firstDayOfNextMonth = getFirstDayOfNextMonth(accountInfo.date);
        const firstDayOfAccountMonth = getFirstDayOfMonth(accountInfo.date);
        const spendDateObj = new Date(spendDate);

        if (spendDateObj <= firstDayOfAccountMonth || spendDateObj >= firstDayOfNextMonth) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                message: "please enter the expense for this month only"
            })
        }

        if (accountInfo.balance === 0) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Not enough balance to add expense" });
        }

        const isOverBudget = amount > accountInfo.budget;
        if (isOverBudget) {
            responsePayload.budgetAlert = "true";
        }

        let updatedBalance = accountInfo.balance;
        if (amount > updatedBalance) {
            responsePayload.balanceAlert = "true";
            responsePayload.exceededAmountOverBalance = updatedBalance - amount;
            updatedBalance = 0;
        } else {
            updatedBalance -= amount;
        }

        const updatedTotalSpend = accountInfo.totalSpend + amount;
        const isTotalSpendOverBudget = updatedTotalSpend > accountInfo.budget;
        if (isTotalSpendOverBudget) {
            responsePayload.totalSpendAlert = "true";
        }

        await Account.updateOne(
            { _id: accountInfo._id },
            {
                $set: {
                    balance: updatedBalance,
                    totalSpend: updatedTotalSpend,
                },
            },
            { session }
        );

        const newExpense = new Expense({
            userId: userId,
            accountId: accountInfo._id,
            amount: amount,
            category: category,
            description: description,
            spendDate: spendDate,
            createdAt: createdAt,
            isRecurring : isRecurring,
        });

        await newExpense.save({ session });

        await session.commitTransaction();
        session.endSession();

        req.responsePayload = responsePayload;
        next();
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(`Error occurred during storing the expense: ${error}`);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

accountRouter.post("/addexpense", authMiddleware, validateExpenseInput, storeExpense, (req, res) => {
    const responsePayload = req.responsePayload;

    res.json({
        message: "expense added !",
        responsePayload
    })
})


accountRouter.get("/totalbycategorty",authMiddleware,async (req,res) => {
    const userId = new mongoose.Types.ObjectId(req.userId);
    
    try{    
        const expenses = await Expense.aggregate([
            {$match : {userId : userId}},
            {$group : {_id : "$category" , total : { $sum : "$amount"}}}
        ]);
        
        if(!expenses.length){
            return res.status(404).json({ message: "No expenses found for this user" });
        }

        const responsePayload = expenses.reduce((acc , {_id,total})=>{
            acc[_id] = total;
            return acc;
        },{});

        res.json(responsePayload);
    }catch (error) {    
        console.log(`error occured during fetching expenses ${error}`);
        return res.status(500).json({
            message : "Internal server error"
        })
    }

})

accountRouter.get("/recentexpense", authMiddleware, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const query = { userId: req.userId };
    const { category, startdate, enddate, description } = req.query;

    
    try {
        const totalItems = await Expense.countDocuments(query);
        const totalPages = Math.ceil(totalItems/limit);

        const hasFilter = category || startdate || enddate || description;
        if (hasFilter) {
            
            if (category) {
                const newCategory = category.split(",");            
                
                if (newCategory.length > 0) {
                    query.category = { $in: newCategory }; 
                }
            }

            if(description) {
                if(description.length > 0){
                    query.description = { $regex : description , $options : 'i'}
                }
            }

            if (startdate || enddate) {
                query.spendDate = {}
                if (startdate) {
                    const formattedStartDate = startdate.split('-').map(part => part.padStart(2, '0')).join('-'); 
                    const startDateObj = new Date(`${formattedStartDate}T00:00:00.000Z`);
                    query.spendDate.$gte = startDateObj;
                }
                if (enddate) {
                    const formattedEndDate = enddate.split('-').map(part => part.padStart(2,'0')).join('-');
                    const endDateObj = new Date(`${formattedEndDate}T00:00:00.000Z`); 
                    query.spendDate.$lte = endDateObj;
                }
            }
            const filteredResponse = await Expense.find(query, { _id: 0, userId: 0, accountId: 0, __v: 0 })
                .sort({ spendDate: -1 })
                .skip(skip)
                .limit(limit);

            if (filteredResponse.length === 0) {
                return res.status(404).json({
                    message: "No transactions found"
                })
            }

            return res.json(
                {
                    currentPage : page,
                    totalPages,
                    totalItems,
                    transactions : filteredResponse,
                });
        }

        const recentexpense = await Expense.find({ userId: req.userId }, { _id: 0, userId: 0, accountId: 0, __v: 0 })
            .sort({ spendDate: -1 })
            .skip(skip)
            .limit(10)

        if (recentexpense.length === 0) {
            return res.status(404).json({
                message: "No transactions found"
            })
        }

        res.json({
            currentPage : page,
            totalPages,
            totalItems,
            transactions : recentexpense
        })

    } catch (error) {
        console.error(`Error while getting the recent transactions: ${error}`);
        return res.status(500).json({ message: "Internal server error"});
    }
})


accountRouter.get("/recurrings",authMiddleware,async (req,res)=>{
    const {category} = req.query;
    const query = {userId : req.userId};
    query.isRecurring = true;
    try{
        if(category){
            query.category = category;
        }

        const response = await Expense.find(query,{_id : 1, category: 1, amount : 1, description : 1, spendDate : 1});
        if(response.length === 0){
            return res.status(404).json({
                message : "No Recurring Expense Found"
            });
        }

        res.json(response);
    }catch(error){
        console.log(`error occured during fetching data from the expense ${error}`);
        return res.status(500).json({
            message : "Internal server error"
        })
    }
});

// first fetch the recurring transaction by category filter 
accountRouter.post("/updaterecurring", authMiddleware, async (req, res) => {
    const { expenseId, newAmount, newCategory, newIsRecurring } = req.body;

    if (!expenseId || !mongoose.Types.ObjectId.isValid(expenseId)) {
        return res.status(400).json({ message: "Invalid or missing expenseId" });
    }

    if (newAmount === undefined && !newCategory && newIsRecurring === undefined) {
        return res.status(400).json({ message: "No valid fields provided for update" });
    }

    const query = {};
    if (newAmount !== undefined) {
        if (typeof newAmount !== "number") {
            return res.status(400).json({ message: "Amount must be a number" });
        }
        query.amount = newAmount;
    }
    if (newCategory) {
        query.category = newCategory;
    }
    if (newIsRecurring !== undefined) {
        query.isRecurring = newIsRecurring;
    }

    try {
        const result = await Expense.updateOne({ _id: expenseId }, query);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.json({ message: "Updated Successfully" });
    } catch (error) {
        console.log(`Error while updating the expense: ${error}`);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

accountRouter.get("/allexportmonths",authMiddleware,async (req,res)=> {
    const userId = req.userId;
    const account = await Account.findOne({userId : userId}, {date : 1});
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const startMonth = account.date.getMonth();
    const startYear = account.date.getFullYear();

    const date = new Date();

    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const response = [];
    
        for(let j = startMonth; j<=currentMonth; j++){
            const val = `${monthNames[j]} ${startYear}`;
            response.push(val);
        }

    res.json(response);
    
    
})




module.exports = accountRouter;