import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    key : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true,
        unique : true
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required :true,
        default : "Any"
    },
    image : {
        type : [String],
        required : true,
        default : ["https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fcar&psig=AOvVaw2IAeI_7U8keq8Q5koToET2&ust=1737614952225000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPC60aTeiIsDFQAAAAAdAAAAABAR"]
    },
    isAvailable : {
        type : Boolean,
        required : true,
        default : true
    }
})

const Product = mongoose.model("product",productSchema)

export default Product;