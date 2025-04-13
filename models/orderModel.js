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

  // Changed from orderedItems (array) to single product object
  product: {
    key: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
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

const Order = mongoose.model("Order", orderSchema);

export default Order;
