import UserModel from "../models/UserModel.js";
import EmailSend from "../utility/emailUtility.js";
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
    try{
        let email = req.params.email;
        let data = await UserModel.findOne({"email":email});
        if(data == null){
            return res.json({status:"fail","Message":"User not found"})
        }else{
            let code = Math.floor(100000+Math.random()*900000);
             let EmailTo = data['email'];
             let EmailText = "Your Code is" + " " + code;
             let EmailSubject = "Task Manger Verification Code"
             let EmailHTMLBody=` <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Task Manager Verification Code</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                                background-color: #f4f4f4;
                            }
                            .email-container {
                                max-width: 600px;
                                margin: 20px auto;
                                background-color: #ffffff;
                                padding: 20px;
                                border-radius: 8px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                text-align: center;
                                margin-bottom: 20px;
                            }
                            .header h1 {
                                color: #333333;
                                font-size: 24px;
                                margin: 0;
                            }
                            .content {
                                text-align: center;
                                color: #666666;
                                line-height: 1.6;
                            }
                            .content p {
                                font-size: 16px;
                            }
                            .code {
                                font-size: 24px;
                                font-weight: bold;
                                color: #000000;
                                margin: 20px 0;
                            }
                            .footer {
                                text-align: center;
                                margin-top: 20px;
                                font-size: 14px;
                                color: #999999;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="email-container">
                            <div class="header">
                                <h1>Task Manager Verification Code</h1>
                            </div>
                            <div class="content">
                                <p>Hi,</p>
                                <p>Your verification code is:</p>
                                <div class="code">${code}</div>
                                <p>Please use this code to verify your account. This code is valid for the next 10 minutes.</p>
                            </div>
                            <div class="footer">
                                <p>If you did not request this code, please ignore this email.</p>
                            </div>
                        </div>
                    </body>
                    </html>`
             await EmailSend(EmailTo,EmailText,EmailSubject,EmailHTMLBody);


             await UserModel.updateOne({email:email},{otp:code});
            return res.json({status:"success","Message":"User Email Verify Successfully"})
        }

    }catch(err){
        return res.json({status:"fail","Message":err.toString()})
    } 
}

export const CodeVerify = async (req,res)=>{
    try{
        let email = req.params.email;
        let code = req.params.code;
        let data = await UserModel.findOne({"email":email,otp:code});
        if(data == null){
            return res.json({status:"fail","Message":"User not found or Invalid Code"})
        }
        else{
            // await UserModel.updateOne({email:email},{otp:null});
            return res.json({status:"success","Message":"User Email Verify Successfully"})
        }


    }catch{
        return res.json({status:"fail","Message":err.toString()})
    }
}

export const ResetPassword = async (req,res)=>{
    try{
        let reqBody = req.body;
        let data = await UserModel.findOne({"email":reqBody["email"],otp:reqBody["code"]});
        if(data == null){
            return res.json({status:"fail","Message":"User not found or Invalid Code"})
        }
        else{
            let newPassword = reqBody["password"];
            await UserModel.updateOne({email:reqBody["email"]},{otp:"0",password:newPassword});
            return res.json({status:"success","Message":"User Reset Password Successfully"})
        }

    }catch{
        return res.json({status:"fail","Message":err.toString()})
    }
}
