const express = require("express");
const zod = require("zod");
const argon2 = require("argon2");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware");
const userRouter = express.Router();
require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET;


const signupInputSchema = zod.object({
    name : zod.string().min(1,{message : "name is required"}).max(20,{message : "name cannot be this long"}),
    email : zod.string().email({message : "sorry, this email is not valid"}).min(1,{message : "email is required"}),
    password : zod.string().min(8,{message : "password must be at least 8 characters long"})
                .refine((value) => /[A-Z]/.test(value), {
                    message : "Password must include at least one uppercase letter",
                })
                .refine((value)=> /[a-z]/.test(value) , {
                    message : "Password must include at least one lowercase letter"
                })
                .refine((value) => /\d/.test(value),{
                    message : "Password  must include at least one number"
                })
                .refine((value) => /[@$!%*?&#]/.test(value), {
                    message: "Password must include at least one special character (@$!%*?&#).",
                })
});

function signupInputValidation(req,res,next){
    const response = signupInputSchema.safeParse(req.body);

    if(!response.success){
        const errors = response.error.errors.map(error => ({
            path : error.path,
            message : error.message
        }))
        return res.status(403).json(errors);
    }

    next();
}

async function userExistCheck(req,res,next) {
    const {email} = req.body;

    try{
        const userExist = await User.findOne({email} ,{_id : 1})
        if(userExist){
            return res.status(409).json({message : "this email is already in use, choose different email"});
        }

        next();
    } catch(error){
        console.log(`error during searching in database ${error}`);
        return res.status(500).json({message : "internal server error"});
    }

}

async function storeInDataBase(req,res,next){
    const {name,email,password} = req.body

    const hashedPassword = await argon2.hash(password);

    const newUser = new User({
        name,
        email,
        hashed_password : hashedPassword
    });


    try{
        await newUser.save();
        const userId = newUser._id;
        await Account.create({userId});
        next();
        
    }catch(error){
        console.log(`error during storing data in database ${error}`);
        return res.json({
            message : "error during storing data in database"
        });
    }

}

userRouter.post("/signup",signupInputValidation,userExistCheck,storeInDataBase,(req,res)=>{
    res.json({
        message : "user created successfully"
    })
});


// #############################


const signinInputSchema = zod.object({
    email : zod.string().email({message : "please enter valid email address"}).min(1,{message : "email is required"}),
    password : zod.string().min(1,{message : "please enter your password"})
});

function signinInputValidation(req,res,next){
    const response = signinInputSchema.safeParse(req.body);
    if(!response.success){
        const errors = response.error.errors.map((err) => ({
            path : err.path,
            message : err.message
        }));

        return res.status(403).json(errors);
    }
    next();
}

async function userExistAndPasswordCheck(req, res, next){
    const {email,password} = req.body;

    try{
        const userExist = await User.findOne({email},{hashed_password : 1});
        if(!userExist){
            return res.status(404).json({message : "user does not exist"});
        }
        const passwordCheck = await argon2.verify(userExist.hashed_password, password);
        if(!passwordCheck){
            return res.status(401).json({
                message : "incorrect password"
            });
        }
        const userId = userExist._id;
        req.userId = userId;
        next();
        
    }catch(error){
        console.log(`error during fetching data from the backend ${error}`);
        return res.status(500).json({message : "Internal server error"});
    }

}

userRouter.post("/signin",signinInputValidation,userExistAndPasswordCheck,(req,res)=>{
    const token = jwt.sign( {userId : req.userId} , JWT_SECRET);
    res.json({
        message : "Logging In",
        token : token
    })
});



// #########################################

const updateSchema = zod.object({
    name : zod.string().min(1,"name can not be this small ").optional(),
    
    password : zod.object({

        current_password : zod.string().min(1,{message:"please enter the current password"}),
        new_password : zod.string().min(8,"password must be atleast 8 characters long")
                        .refine((value) => /[A-Z]/.test(value), {
                            message : "Password must include at least one uppercase letter",
                        })
                        .refine((value)=> /[a-z]/.test(value) , {
                            message : "Password must include at least one lowercase letter"
                        })
                        .refine((value) => /\d/.test(value),{
                            message : "Password  must include at least one number"
                        })
                        .refine((value) => /[@$!%*?&#]/.test(value), {
                            message: "Password must include at least one special character (@$!%*?&#).",
                        })
    }).optional()
}) 

function updateInputValidation(req,res,next){
    const response = updateSchema.safeParse(req.body);
    if(!response.success){
        const errors = response.error.errors.map(err => ({
            path : err.path,
            message : err.message
        }));

        return res.status(403).json(errors);
    }

    next();
}

async function handleUpdate(req,res,next){
    const updatedFields = {}
    if(req.body.password){
        const {current_password , new_password} = req.body.password;
        try{
            const user = await User.findOne({_id : req.userId},{hashed_password : 1});
            if(!user){
                return res.status(401).json({message : "unuthorized access"});
            }

            const isCurrentPasswordValid = await argon2.verify(user.hashed_password, current_password);
            if(!isCurrentPasswordValid){
                return res.status(400).json({message : "incorrect current password"});
            }

            const isSamePassword = current_password === new_password;
            if(isSamePassword){
                return res.status(409).json({
                    message : "previous password can not be new password"
                })
            }

            updatedFields.hashed_password = await argon2.hash(new_password);
        } catch(error){
            console.log(`error during password validation ${error}`);
            return res.status(500).json({
                message : "internal server error"
            })
        }
    }

    if(req.body.name){
        updatedFields.name = req.body.name;
    }

    try{
        await User.updateOne({_id : req.userId} , updatedFields);
        next();
    }catch(error){
        console.log(`error while updating data in database ${error}`);
        return res.status(500).json({
            message : "internal server error"
        })
    }
}

userRouter.put("/updateinfo",
    authMiddleware,
    updateInputValidation,
    handleUpdate,
    (req,res)=>{
        res.json({message : "updated successfully"});
})


userRouter.get("/userinfo",authMiddleware, async (req,res)=>{
    const userId = req.userId;
    try{
        const response = await User.findOne({_id : userId} , {_id : 0, __v : 0, hashed_password : 0 });
        if(!response){
            return res.status(400).json({
                message : "User not found !"
            });
        }
        res.json(response);
    }catch(error){
        console.log(`error while getting data ${error}`);
        return res.status(500).json({
            message : "Internal server error !"
        })
    }
})



module.exports = userRouter;