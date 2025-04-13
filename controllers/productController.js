import Product from "../models/productModel.js";
import {isAdmin} from "./userController.js";

export async function addProduct(req, res){
    console.log(req.user) //the user who adds the product using the token

    if(req.user == null){
        res.status(401).json({message : "Please login to proceed!"})
        return //to stop the function execution further if the user is not logged in
    }

    if(req.user.userRole != "admin"){
        res.status(403).json({message : "You are not authorized to add a product!"})
        return
    }

    const productData = req.body;

    const newProduct = new Product(productData);

    try{
        await newProduct.save() // to use await this must be a async function
        res.json({message : "Product addition successful!"})
    }catch(err){
        res.status(500).json({message : "Product addition failed!"})
    }
}

export async function getProducts(req, res){

    try{
        if(isAdmin(req)){
                const products = await Product.find()
                res.json(products)
        }
        else{
                const products = await Product.find({isAvailable : true})
                res.json(products)
            }
    }catch(err){
        res.json({message : "Failed to get products!"})
    }
}

export async function updateProduct(req, res){

    try{
        if(isAdmin(req)){
            const key = req.params.key
            const productData = req.body

            await Product.updateOne({key : key}, productData)
            res.json({message : "Product updated successfully!"})
            return
        }
        else{
            res.status(403).json({message : "You are not authorized to update the product!"})
        }

    }catch(err){
        res.status(500).json({message : "Failed to update product!"})
    }

}

export async function deleteProduct(req, res){
    try{
        if(isAdmin(req)){
            const key = req.params.key
            await Product.deleteOne({key : key})
            res.json({message : "Product deleted successfully!"})    
        }
        else{
            res.status(403).json({message : "You are not authorized to delete the product!"})
        }
    }catch(err){
        res.status(500).json({message : "Failed to delete product!"})
    }
}

export async function getOneProduct(req, res){
    try{
        const key = req.params.key;

        const product = await Product.findOne({key : key})

        if(product == null){
            res.status(404).json({message : "Product not found!"})  
            return;
        }

        res.json(product)
        return;

    }
    catch(err){
        res.status(500).json({message : "Failed to get product!"})  
    }
}



