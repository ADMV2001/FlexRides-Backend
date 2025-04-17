import mongoose from "mongoose";

let userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    isBlocked :{
        type : Boolean,
        required : true,
        default : false
    },
    userRole : {
        type : String,
        required : true,
        default : 'customer' //if we did not provide the type then it will be user by default
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true
    },
    profilePic : {
        type : String,
        required : true,
        default : 'https://icons8.com/icon/7819/male-user'
    }
});

let User = mongoose.model('user',userSchema)

export default User;