import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import body_parser from "body-parser";
import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";

import router from "./routes/api.js";
import {MONGODB_CONNECTION,PORT,Max_JSON_SIZE,URL_ENCODER,WEB_CACHE,REQUEST_LIMIT_TIME,REQUEST_LIMIT_NUMBER} from "./app/config/config.js";

const app = express();

//Global Application Middleware
app.use(cors());
app.use(express.json({limit:Max_JSON_SIZE}));
app.use(express.urlencoded({extended: URL_ENCODER}));
app.use(helmet());

  // Rate Limiting middleware
const limiter =rateLimit({windowMs:REQUEST_LIMIT_TIME,max:REQUEST_LIMIT_NUMBER});
app.use(limiter);

//Web Caching
app.set('etag',WEB_CACHE);

//MongoDB Connection
mongoose.connect(MONGODB_CONNECTION,{autoIndex:true}).then(()=>{
    console.log("Connected to MongoDB");
}).catch(err=>{
    console.log("Error connecting to MongoDB");
})


//Set API Routes
app.use("/api",router);



//Run Your Express Back End Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});