import express from "express";
import {approveOrDeclineOrder, createOrder, getAllOrders, getQuotation} from "../controllers/orderController.js";

const orderRouter = express.Router()

orderRouter.post("/createOrder", createOrder)
orderRouter.post("/getQuotation", getQuotation)
orderRouter.get("/getAllOrders", getAllOrders)
orderRouter.put("/status/:orderId", approveOrDeclineOrder)

export default orderRouter