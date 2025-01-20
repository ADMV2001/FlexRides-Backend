import Product from "../models/productModel.js";

export async function addProduct(req, res){
    console.log(req.user) //the user who adds the product using the token

    if(req.user == null){
        res.status(401).json({message : "Please login to proceed!"})
        return //to stop the function execution further if the user is not logged in
    }

    if(req.user.userRole != "admin"){
        res.status(403).jason({message : "You are not authorized to add a product!"})
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

