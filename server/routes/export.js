const express = require("express");
const authMiddleware = require("../middleware");
const exportRouter = express.Router();
const ExcelJs = require("exceljs");
const { Expense } = require("../db");

const getFirstDayOfMonth = (startdate) => {
    const nextMonthDate = new Date(startdate);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    nextMonthDate.setDate(1)
    return nextMonthDate.toISOString()
}


exportRouter.get("/xlsx", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const startdate = req.query.month;
    const enddate = getFirstDayOfMonth(startdate)

    const query = { userId: userId };
    query.spendDate = {
        $gte: new Date(startdate),
        $lt: new Date(enddate),
    };

    try {
        const expenses = await Expense.find(query, { userId: 0, _id: 0, accountId: 0, __v: 0 }).sort({spendDate : 1});
        if (expenses.length === 0) {
            return res.status(404).json({
                message: "No expense data is found"
            });
        }

        const workbook = new ExcelJs.Workbook();
        const worksheet = workbook.addWorksheet("Expense");

        worksheet.columns = [
            { header: 'No', key: 'no', width: 5 },
            { header: 'Amount', key: 'amount', width: 15 }, ,
            { header: 'Category', key: 'category', width: 15 },
            { header: 'Description', key: 'description', width: 30 },
            { header: 'Spend Date', key: 'spendDate', width: 15 },
            { header: 'Recurring', key: 'recurring', width: 10 },
        ];

        expenses.forEach((expense, index) => {
            worksheet.addRow({
                no: index + 1,
                amount: expense.amount,
                category: expense.category,
                description: expense.description,
                spendDate: expense.spendDate.toISOString().split("T")[0],
                recurring: expense.isRecurring ? "Yes" : "No"
            });
        });

        worksheet.eachRow((row) => {
            row.eachCell((cell) => {
                cell.alignment = { horizontal: 'center', vertical: 'middle' };
            });
        });

        const xlsxBuffer = await workbook.xlsx.writeBuffer();

        res.setHeader("Content-Disposition", `attachment; filename=expenses.xlsx`);
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        res.send(xlsxBuffer);
    } catch (error) {
        console.log(`error while exporing expense ${error}`);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
});

exportRouter.get("/csv", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const startdate = req.query.month;
    const enddate = getFirstDayOfMonth(startdate)

    const query = { userId: userId };
    query.spendDate = {
        $gte: new Date(startdate),
        $lt: new Date(enddate),
    };


    try {
        const expenses = await Expense.find(query, { userId: 0, _id: 0, accountId: 0, __v: 0 }).sort({spendDate : 1});
        if (expenses.length === 0) {
            return res.status(404).json({
                message: "No expense data is found"
            });
        }

        const workbook = new ExcelJs.Workbook();
        const worksheet = workbook.addWorksheet("Expense");

        worksheet.columns = [
            { header: 'No', key: 'no', width: 5 },
            { header: 'Amount', key: 'amount', width: 15 }, ,
            { header: 'Category', key: 'category', width: 15 },
            { header: 'Description', key: 'description', width: 30 },
            { header: 'Spend Date', key: 'spendDate', width: 15 },
            { header: 'Recurring', key: 'recurring', width: 10 },
        ];

        expenses.forEach((expense, index) => {
            worksheet.addRow({
                no: index + 1,
                amount: expense.amount,
                category: expense.category,
                description: expense.description,
                spendDate: expense.spendDate.toISOString().split("T")[0],
                recurring: expense.isRecurring ? "Yes" : "No"
            });
        });

        worksheet.eachRow((row) => {
            row.eachCell((cell) => {
                cell.alignment = { horizontal: 'center', vertical: 'middle' };
            });
        });

        const csvBuffer = await workbook.csv.writeBuffer();

        res.setHeader("Content-Disposition", "attachment; filename=expenses.csv");
        res.setHeader("Content-Type", "text/csv");

        res.send(csvBuffer);
    } catch (error) {
        console.log(`error while exporing expense ${error}`);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
});

module.exports = exportRouter;