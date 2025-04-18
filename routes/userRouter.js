import express from "express";
import {registerUser,loginUser, getAllUsers, blockOrUnblockUser, getOneUser, loginWithGoogle, sendOtp, verifyOtp} from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.post("/signup",registerUser)
userRouter.post("/login",loginUser) 
userRouter.get("/getAllUsers", getAllUsers)
userRouter.put("/block/:email", blockOrUnblockUser)
userRouter.get("/getOneUser", getOneUser)
userRouter.post("/googleLogin", loginWithGoogle)
userRouter.get("/sendOtp", sendOtp)
userRouter.post("/verifyOtp", verifyOtp)


export default userRouter;