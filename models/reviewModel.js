import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    },
    profilePic : {
        type : String,
        required : true,
        default : 'https://icons8.com/icon/7819/male-user'   
    },
    isApproved : {
        type : Boolean,
        required : true,
        default : false
    }
})

const Review = mongoose.model('review',reviewSchema)

export default Review;