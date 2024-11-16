import express from "express";
const router = express.Router();

import * as TaskController from "../app/controllers/TaskController.js";
import * as UsersController from "../app/controllers/UsersController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";




//users 
router.post('/Registration',UsersController.Registration);
router.post('/Login',UsersController.Login);
router.get('/ProfileDetails',AuthMiddleware,UsersController.ProfileDetails);
router.post('/ProfileUpdate',AuthMiddleware,UsersController.ProfileUpdate);
router.get('/EmailVerify',UsersController.EmailVerify);
router.post('/CodeVerify',UsersController.CodeVerify);
router.post('/ResetPassword',UsersController.ResetPassword);


//Task 
router.post('/CreateTask',AuthMiddleware,TaskController.CreateTask);
router.get('/UpdateTaskStatus',AuthMiddleware,TaskController.UpdateTaskStatus);
router.get('/TaskListByStatus',AuthMiddleware,TaskController.TaskListByStatus);
router.get('/DeleteTask',AuthMiddleware,TaskController.DeleteTask);
router.get('/CountTask',AuthMiddleware,TaskController.CountTask);



export default router;