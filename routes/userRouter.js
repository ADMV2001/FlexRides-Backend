import express from "express";
import {registerUser,loginUser, getAllUsers, blockOrUnblockUser, getOneUser} from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.post("/signup",registerUser)
userRouter.post("/login",loginUser) 
userRouter.get("/getAllUsers", getAllUsers)
userRouter.put("/block/:email", blockOrUnblockUser)
userRouter.get("/getOneUser", getOneUser)


export default userRouter;