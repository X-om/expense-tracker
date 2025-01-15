const mongoose = require("mongoose");
const { date } = require("zod");
require("dotenv").config()

const dbURL = process.env.MONGO_URL

mongoose.connect(dbURL).then(()=>{
    console.log("connnection successfull");
}).catch((error)=>{
    console.log(`error during database connection ${error}`);
});


const userSchema = new mongoose.Schema({
    name :  {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 20,
        trim : true,
        tolowercase : true
    },
    email : { 
        type : String,
        required : true,
        lowercase: true,
        minLength : 3,
        trim : true,
        match : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    hashed_password : {
        type : String,
        required : true,
        minLength : 8
    }
});


const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    },
    hasData: { 
        type : Boolean,
        default : false
    },
    income : {
        type : Number,
        required : true,
        min : 0,
        max : 250000,
        default : 0
    },
    initialBalance : {
        type : Number,
        default : 0
    },
    balance : {
        type : Number,
        required : true,
        min : 0,
        default : 0
    },
    budget : {
        type : Number,
        required : true,
        min : 0,
        default : 0
    },
    date : {
        type : Date,
        default : Date.now(),
        validate : {
            validator : (value) =>{
                return value <= Date.now();
            },
            message : "Date cannot be in the future"
        }

    },
    totalSpend: {
        type: Number,
        default: 0, 
        min: 0
      },
});


accountSchema.pre('save', function(next){
    if(this.balance > this.income){
        return next(new Error('Balance cannot exceed monthly income'));
    }
    if(this.budget > this.balance){
        return next(new Error('Budget cannot exceed balance'));
    }
    next();
})



const expenseSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    },
    accountId : {
        type : mongoose.Types.ObjectId,
        ref : 'Account',
        required : true,
    },
    amount : {
        type : Number,
        min : 0,
        required : true
    },
    category : {
        type : String,
        enum : ['food', 'subscription', 'shopping', 'rent', 'bill', 'travel', 'other'],
        default : 'other',
        required : true
    },
    description : {
        type : String,
        minLength : 0,
        default : "spend",
    },
    spendDate : {
        type : Date,
        default : Date.now,
        validate : {
            validator : (value) =>{
                const currentDate = new Date().toDateString();
                const clientDate = new Date(value).toDateString();
                return clientDate <= currentDate;
            },
            message : "Date cannot be in the future"
        }
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        validate : {
            validator : (value) =>{
                return value <= Date.now();
            },
            message : "Date cannot be in the future"
        }
    },
    isRecurring : {
        type : Boolean,
        default : false
    }
})

module.exports = {
    User : mongoose.model('User',userSchema),
    Account : mongoose.model('Account',accountSchema),
    Expense : mongoose.model('Expense',expenseSchema),
}


