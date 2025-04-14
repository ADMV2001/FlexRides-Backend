import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  email: {
    type: String,
    required: true
  },

  //list of ordered items
  orderedItems: {
    type : [
      {
        product : {
          key : {
            type : String,
            required : true
          },
          name : {
            type : String,
            required : true
          },
          image : {
            type : String,
            required : true
          },
          price : {
            type : Number,
            required : true
          }
        },
        quantity : {
          type : Number,
          required : true
        }
      }
    ],
    required: true  
  },

  days: {
    type: Number,
    required: true
  },
  startingDate: {
    type: Date,
    required: true
  },
  endingDate: {
    type: Date,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  }
});

const Order = mongoose.model("Orders", orderSchema);

export default Order;
