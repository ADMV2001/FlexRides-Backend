import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export default async function createOrder(req, res) {
    const data = req.body;
    const orderInfo = {};

    // Check if the user is logged in
    if (!req.user) {
        return res.json({ message: "Please login and try again!" });
    }

    // Get user's email
    orderInfo.email = req.user.email;

    // Generate unique orderId
    const lastOrder = await Order.find().sort({ orderDate: -1 }).limit(1);
    
    if (lastOrder.length === 0) {
        orderInfo.orderId = "ORD-0001";
    } else {
        const lastOrderId = lastOrder[0].orderId;
        const lastOrderNumber = parseInt(lastOrderId.replace("ORD-", ""));
        const currentOrderNumber = lastOrderNumber + 1;
        const formattedOrderNumber = String(currentOrderNumber).padStart(4, "0");
        orderInfo.orderId = "ORD-" + formattedOrderNumber;
    }

    // Find the selected product
    try {
        const product = await Product.findOne({ key: data.productKey });

        if (!product) {
            return res.json({ message: "Product with key '" + data.productKey + "' is not found!" });
        }

        if (!product.isAvailable) {
            return res.json({ message: "Product with key '" + data.productKey + "' is not available!" });
        }

        // Attach product info to the order
        orderInfo.product = {
            key: product.key,
            name: product.name,
            image: product.image[0],
            price: product.price
        };

        // Add other order details
        orderInfo.days = data.days;
        orderInfo.startingDate = data.startingDate;
        orderInfo.endingDate = data.endingDate;
        orderInfo.totalAmount = product.price * data.days;

        // Save order to DB
        const newOrder = new Order(orderInfo);
        const result = await newOrder.save();

        res.json({ message: "Order created successfully!", result: result });
    } catch (err) {
        console.error(err);
        res.json({ message: "Error creating order!" });
    }
}
