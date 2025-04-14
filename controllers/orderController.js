import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export async function createOrder(req, res) {
    const data = req.body;
    const orderInfo = {
        orderedItems: []
    }; //data will be pushed into here

    // Check if the user is logged in
    if (!req.user) {
        res.json({ message: "Please login and try again!" });
        return
    }

    // Get user's email
    orderInfo.email = req.user.email;

    // Generate unique orderId
    const lastOrder = await Order.find().sort({ orderDate: -1 }).limit(1); //get the last orderId
    
    if (lastOrder.length == 0) {
        orderInfo.orderId = "ORD-0001";
    } else {
        const lastOrderId = lastOrder[0].orderId;
        const lastOrderNumber = parseInt(lastOrderId.replace("ORD-", ""));
        const currentOrderNumber = lastOrderNumber + 1;
        const formattedOrderNumber = String(currentOrderNumber).padStart(4, "0");
        orderInfo.orderId = "ORD-" + formattedOrderNumber;
    }

    let oneDayCost = 0;

    for(let i=0; i<data.orderedItems.length; i++){
        try{
            const product = await Product.findOne({key: data.orderedItems[i].key})

            if(product == null){
                res.json({message: "Product with key " + data.orderedItems[i].key + " not found!"})
                return
            }

            if(product.isAvailable == false){
                res.json({message: "Product with key " + data.orderedItems[i].key + " is not available!"})
                return
            }

            orderInfo.orderedItems.push({
                product : {
                    key : product.key,
                    name : product.name,
                    image : product.image[0],
                    price : product.price
                },
                quantity : data.orderedItems[i].quantity
            })

            oneDayCost += product.price * data.orderedItems[i].quantity
        }
        catch(err){
            console.log(err)
            res.json({message: "Error while creating order!"})
            return
        }
    }

    orderInfo.days = data.days;
    orderInfo.startingDate = data.startingDate;
    orderInfo.endingDate = data.endingDate;
    orderInfo.totalAmount = oneDayCost * data.days;

    try{
        const newOrder = new Order(orderInfo)
        const result = await newOrder.save()
        res.json({message: "Order created successfully!", order: result})
    }
    catch(err){
        console.log(err)
        res.json({message: "Error while creating order!!"})
        return
    }
}
