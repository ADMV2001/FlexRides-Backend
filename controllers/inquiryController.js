import Inquiry from "../models/inquiryModel.js";
import {isCustomer, isAdmin} from "./userController.js"

export async function addInquiry(req, res){
    try{
        if (req.user == null) {
            return res.status(401).json({
                message: "Please login to submit an inquiry"
            });
        }

        if (!isCustomer(req)) {
            return res.status(403).json({
                message: "Only customers can submit inquiries"
            });
        }

        const inquiryData = req.body
        inquiryData.email = req.user.email
        inquiryData.mobile = req.user.mobile

            //generating a unique inquiry id
        let id = 0

        const inquiries = await Inquiry.find().sort({inqId : -1}).limit(1)

        if(inquiries.length == 0){
            id = 1
        }
        else{
            id = inquiries[0].inqId + 1
        }

        inquiryData.inqId = id

        const newInquiry = new Inquiry(inquiryData)
        const response = await newInquiry.save()

        res.json({message : "Inquiry added successfully!", id : id})
        
    }catch(err){
        console.log(err)
        res.status(400).json("Error : " + err)
    }
}

export async function getInquiries(req, res){
    try{
        if(req.user == null){
            return res.status(401).json({message : "Please login to view inquiries"})
        }
        else if(isAdmin(req)){
            const inquiries = await Inquiry.find()
            res.json(inquiries)
        }
        else if(isCustomer(req)){
            const inquiries = await Inquiry.find({email : req.user.email})
            res.json(inquiries)
        }
    }catch(err){
        res.status(400).json("Error : " + err)
    }
    
}

export async function deleteInquiry(req, res){
    try{
        const id = req.params.id

        if(isAdmin){
            await Inquiry.deleteOne({inqId : id})
            res.json({message : "Inquiry deleted successfully!"})
            return
        }
        else if(isCustomer){
            const inquiry = Inquiry.findOne({inqId : id})

            if(inquiry == null){
                res.status(404).json({message : "Inquiry not found!"})
                return
            }
            else{
                if(inquiry.email == req.user.email){
                    await Inquiry.deleteOne({inqId : id})
                    res.json({message : "Inquiry deleted successfully!"})
                    return
                }
                else{
                    res.status(403).json({message : "You are not authorized to delete this inquiry!"})
                    return
                }

            }
        }
        else{
            res.status(401).json({message : "Please login to delete an inquiry!"})
        }
    }catch(err){
        res.status(400).json("Failed to delete inquiry! " + "Error : "+ err)
    }
}

export async function updateInquiry(req, res){
    try{
        if(!req.user){
            res.json({message : "Please login to update an inquiry!"})
        }

        const id = req.params.id
        const inquiryData = req.body

        if(isAdmin(req)){

            await Inquiry.updateOne({inqId : id}, inquiryData)
            res.json({message : "Inquiry updated successfully!"})
        }
        else if(isCustomer(req)){
            
            const inquiry = await Inquiry.findOne({inqId : id})

            if(inquiry == null){
                res.status(404).json({message : "Inquiry not found!"})
                return
            }
            else{
                if(inquiry.email == req.user.email){
                    await Inquiry.updateOne({inqId : id},{message : inquiryData.message})
                    res.json({message : "Inquiry updated successfully!"})
                    return
                }
                else{
                    res.status(403).json({message : "You are not authorized to update this inquiry!"})
                    return
                }
            }
        }
        else{
            res.status(401).json({message : "You are not authorized to update this inquiry!"}) 
        }
    }catch(err){
        res.status(400).json("Error : " + err)
    }
}