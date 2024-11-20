import mongoose from "mongoose";
import TaskModel from "../models/TaskModel.js"

export const CreateTask = async (req,res)=>{
    try{
        let user_id = req.headers['user_id'];
        let reqBody = req.body;
        reqBody.user_id = user_id;

        await TaskModel.create(reqBody);
        return res.json({status:"success","Message":"User CreateTask Successfully"});

    }catch(err){
        return res.json({status:"fail","Message":err.toString()})
    }
}

export const UpdateTaskStatus = async (req,res)=>{
    try{
        let id = req.params.id;
        let status = req.params.status;
        let user_id = req.headers['user_id'];
        let data = await TaskModel.findOneAndUpdate({"_id":id,"user_id":user_id},{$set:{status:status}},{new:true});
        if(data){
            return res.json({status:"success","Message":"User UpdateTaskStatus Successfully",data:data});
        }
        else{
            return res.json({status:"fail","Message":"Task not found or not belong to user"})
        }

    }catch(err){
        return res.json({status:"fail","Message":err.toString()})
    }
}
export const TaskListByStatus = async (req,res)=>{
    try{
        let status = req.params.status;
        let user_id = req.headers['user_id'];
        let data = await TaskModel.find({"user_id":user_id,"status":status});
        return res.json({status:"success","Message":"User TaskListByStatus Successfully",data:data});
    }catch(err){
        return res.json({status:"fail","Message":err.toString()})
    }
}
export const DeleteTask = async (req,res)=>{
    try{
        let id = req.params.id;
        let user_id = req.headers['user_id'];
        let data = await TaskModel.deleteOne({"_id":id,"user_id":user_id});
        if(data){
            return res.json({status:"success","Message":"User DeleteTask Successfully",data:data});
        }
        else{
            return res.json({status:"fail","Message":"Task not found or not belong to user"})
        }
    }catch{
        return res.json({status:"fail","Message":err.toString()})
    }
}
export const CountTask = async (req,res)=>{
    try{
        let ObjectID = mongoose.Types.ObjectId;
        let user_id = req.headers['user_id'];
        let user_id_object = new ObjectID(user_id);

        let data = await TaskModel.aggregate([
            {$match:{user_id:user_id_object}},
            {$group:{_id:"$status",sum:{$count:{}}}}
        ]);
        return res.json({status:"success","Message":"User CountTask Successfully",data:data});
    }catch(err){
        return res.json({status:"fail","Message":err.toString()})
    }
}