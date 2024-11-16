import  nodemailer  from 'nodemailer';
import {EMAIL_HOST,EMAIL_PORT,EMAIL_USER,EMAIL_PASSWORD} from "../config/config.js";

const EmailSend = async (EmailTo,EmailText,EmailSubject,EmailHTMLBody)=>{
    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: false,  // true for 465, false for other ports
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }

    });


        const mailOptions = {
            from: EMAIL_USER,
            to: EmailTo,
            subject: EmailSubject,
            text: EmailText,
            html: EmailHTMLBody
        }

        try{
            await transporter.sendMail(mailOptions);
            return true;
        }catch(e){
            return false;
        }
    
}

export default EmailSend;