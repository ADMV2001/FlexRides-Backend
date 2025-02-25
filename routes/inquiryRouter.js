import express from "express";
import { addInquiry, deleteInquiry, getInquiries, updateInquiry } from "../controllers/inquiryController.js";

const inquiryRouter = express.Router()

inquiryRouter.post("/addInquiry", addInquiry)
inquiryRouter.get("/getInquiries", getInquiries)
inquiryRouter.delete("/deleteInquiry/:id", deleteInquiry)
inquiryRouter.put("/updateInquiry/:id", updateInquiry)

export default inquiryRouter;