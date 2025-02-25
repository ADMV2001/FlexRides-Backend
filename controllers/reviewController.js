import Review from "../models/reviewModel.js";

//adding a review-----------------------------------------------------------------
export function addReview(req, res){

    if(req.user == null){
        res.status(401).json({message : "Please login and try again!"})
        return
    }

    if(req.user.userRole == 'admin'){
        res.status(401).json({message : "Admins can not add reviews!"})
        return
    }

    const reviewData = req.body;

    reviewData.name = req.user.firstName + " " + req.user.lastName;
    reviewData.profilePic = req.user.profilePic;
    reviewData.email = req.user.email;

    const newReview = new Review(reviewData)

    newReview.save().then(() => {
        res.json({message : "Review added successfully!"})
    }).catch(() => {
        res.json({message : "Review addition failed!"})
    })
}

//getting reviews-----------------------------------------------------------------
export function getReviews(req, res){

    if(req.user == null || req.user.userRole != 'admin'){
        
        Review.find({isApproved : true}).then(
            (reviews)=>{
                res.json(reviews)
            }
        )
        return
    }
    
    if(req.user.userRole == 'admin'){
        Review.find().then(
            (reviews)=>{
                res.json(reviews)
            }
        )
        return
    }
}

//deleting a review-----------------------------------------------------------------
export function deleteReview(req, res){
    const email = req.params.email

    if(req.user == null){
        res.status(401).json({message : "Please login and try again!"})
        return
    }

    if(req.user.userRole == 'customer'){

        if(req.user.email == email){
            Review.deleteOne({email:email}).then(
                res.json({message : "Review deleted successfully!"})
            ).catch(
                res.json({message : "Review Deletion failed!"})
            )
        }
        else{
            res.status(401).json({message : "You can not delete other's reviews!"})
        }
        return
    }
    
    if(req.user.userRole == 'admin'){
        Review.deleteOne({email:email}).then(
            ()=>{
                res.json({message : "Review deleted successfully!"})
            }
        ).catch(
            ()=>{
                res.json({message : "Review Deletion failed!"})
            }
        )
        return
    }
}

//approving a review-----------------------------------------------------------------
export function approveReview(req, res){
    const email = req.params.email

    if(req.user == null){
        res.status(401).json({message : "Please login and try again!"})
        return
    }

    if(req.user.userRole == 'admin'){
        Review.updateOne({email:email},{isApproved:true}).then(
            res.json({message : "Review approved successfully!"})
        ).catch(
            res.json({message : "Review approval failed!"})
        )
    }
    else{
        res.status(401).json({message : "You are not an admin to approve the reviews!"})
    }
}