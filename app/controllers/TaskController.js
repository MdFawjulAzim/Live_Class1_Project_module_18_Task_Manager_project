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
    return res.json({status:"success","Message":"User UpdateTaskStatus Successfully"})
}
export const TaskListByStatus = async (req,res)=>{
    return res.json({status:"success","Message":"User TaskListByStatus Successfully"})
}
export const DeleteTask = async (req,res)=>{
    return res.json({status:"success","Message":"User DeleteTask Successfully"})
}
export const CountTask = async (req,res)=>{
    return res.json({status:"success","Message":"User CountTask Successfully"})
}
