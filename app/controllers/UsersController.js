import UserModel from "../models/UserModel.js";
import { EncodeToken } from './../utility/tokenUtility.js';


//User Registration
export const Registration = async (req,res)=>{
    try{
        let reqBody = req.body;
        await UserModel.create(reqBody);
        return res.json({status:"success","Message":"User Registration Successfully"})
    }catch(err){
        return res.status(400).json({status:"fail","Message":err.toString()})
    }
}

//user login
export const Login=async(req,res)=>{

    try {
        let reqBody=req.body;
        let data=await UserModel.findOne(reqBody)
        if(data===null){
            return res.json({status:"fail","Message":"User not found"})
        }
        else {
            // Login Success Token Encode
            let token=EncodeToken(data['email'],data['_id'])
            return res.json({status:"success",Token:token,"Message":"User Login successfully"})
        }

    }
    catch(err){
        return res.json({status:"fail","Message":err.toString()})
    }

}

//User Profile Details
export const ProfileDetails=async(req,res)=>{
    try {
        let user_id=req.headers['user_id'];
        let data=await UserModel.findOne({"_id":user_id})
        return res.json({status:"success","Message":"User ProfileDetails successfully",data:data})
    }
    catch(err){
        return res.json({status:"fail","Message":err.toString()})
    }
}



export const ProfileUpdate = async (req,res)=>{
    try{
        let reqBody=req.body;
        let user_id=req.headers['user_id'];

        await UserModel.updateOne({"_id":user_id},reqBody)
        return res.json({status:"success","Message":"User Profile Update Successfully"})

    }catch(err){
        return res.json({status:"fail","Message":err.toString()})
    }




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
