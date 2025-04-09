import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export async function registerUser(req, res){

    const userData = req.body;

    userData.password = bcrypt.hashSync(userData.password, 10);

    const newUser = new User(userData);
    
    try {
        await newUser.save();
        res.status(200).json({ message: "User registered successfully!" });
    } catch (err) {
        res .json({ message: "User registration failed!", error: err.message });
    }
    
/*
    newUser.save().then(
        (result)=>{
            res.status(200).json({message : "User registered successfully"})
        }
    ).catch(
        (error)=>{
            res.status(500).json({message : "User registration failed"})
        }
    )
*/
}

export async function loginUser(req, res){
    
    const loginData = req.body;

    try{
        const user = await User.findOne({email:loginData.email})
        if(user == null){
            res.status(404).json({message : "User not found, please enter correct email and password!"})
        }
        else{
            //compare the hashes of password
            let isMatch = bcrypt.compareSync(loginData.password, user.password);
            //if password is correct then login is successful
            if(isMatch){
                const token = jwt.sign({
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email,
                    userRole : user.userRole,
                    profilePic : user.profilePic,
                    mobile : user.mobile
                },process.env.jwt_secret)

                res.status(200).json({message : "Login successful!", token : token, user : user})
                return
            }
            else{
                res.status(401).json({message : "Login failed!"})
                return  
            }
        }
    }catch(err){
        res.status(500).json(err);
    }

    

/*
    User.findOne({
        email : loginData.email
    }).then(
        (user)=>{
            if(user == null){
                res.status(404).json({message : "User not found!"})
            }
            else{
                //compare the hashes of password
                let isMatch = bcrypt.compareSync(loginData.password, user.password);
                //if password is correct then login is successful
                if(isMatch){
                    const token = jwt.sign({
                        firstName : user.firstName,
                        lastName : user.lastName,
                        email : user.email,
                        userRole : user.userRole,
                        profilePic : user.profilePic
                    },process.env.jwt_secret)

                    res.status(200).json({message : "Login successful!", token : token})
                }
                else{
                    res.status(500).json({message : "Login failed!"})  
                }
            }   
        }
    )
*/
}

export function isAdmin(req){

    let admin = false

    if(req.user != null){
        if(req.user.userRole == 'admin'){
            admin = true
        }
    }
    return admin
}

export function isCustomer(req){

    let customer = false;

    if(req.user != null){
        if(req.user.userRole == 'customer'){
            customer = true
        }
    }
    return customer
}