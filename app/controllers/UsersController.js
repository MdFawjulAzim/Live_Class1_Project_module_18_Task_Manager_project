import UserModel from "../models/UserModel.js";



export const Registration = async (req,res)=>{
    try{
        let reqBody = req.body;
        await UserModel.create(reqBody);
        return res.json({status:"success","Message":"User Registration Successfully"})
    }catch(err){
        return res.status(400).json({status:"error","Message":err.toString()})
    }
}

export const Login = async (req,res)=>{
    return res.json({status:"success","Message":"User Login Successfully"})
}
export const ProfileDetails = async (req,res)=>{
    return res.json({status:"success","Message":"User ProfileDetails Successfully"})
}
export const ProfileUpdate = async (req,res)=>{
    return res.json({status:"success","Message":"User ProfileUpdate Successfully"})
}
export const EmailVerify = async (req,res)=>{
    return res.json({status:"success","Message":"User EmailVerify Successfully"})
}
export const CodeVerify = async (req,res)=>{
    return res.json({status:"success","Message":"User CodeVerify Successfully"})
}

export const ResetPassword = async (req,res)=>{
    return res.json({status:"success","Message":"User ResetPassword Successfully"})
}
