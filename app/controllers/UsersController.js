import UserModel from "../models/UserModel.js";
import { EncodeToken } from './../utility/tokenUtility.js';



export const Registration = async (req,res)=>{
    try{
        let reqBody = req.body;
        await UserModel.create(reqBody);
        return res.json({status:"success","Message":"User Registration Successfully"})
    }catch(err){
        return res.status(400).json({status:"fail","Message":err.toString()})
    }
}

export const Login = async (req,res)=>{
    try{
        let reqBody = req.body;
        let data = await UserModel.findOne(reqBody);
        if(data===null){
            return res.status(404).json({status:"fail","Message":"User not found"})
        }
        else{
            //Login Successfully Token Encoded
            let token = EncodeToken(data['email',data['_id']]);
            return res.json({status:"success","Message":"User Login Successfully","token":token})
        }
    }catch(err){
        return res.status(400).json({status:"fail","Message":err.toString()})
    }
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
