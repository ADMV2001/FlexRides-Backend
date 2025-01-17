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
    userRole : {
        type : String,
        required : true,
        default : 'user' //if we did not provide the type then it will be user by default
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
    }
});

let User = mongoose.model('user',userSchema)

export default User;