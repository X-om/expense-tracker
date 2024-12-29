const mongoose = require("mongoose");
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



module.exports = {
    User : mongoose.model('User',userSchema)
}


