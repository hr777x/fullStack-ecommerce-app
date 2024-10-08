import mongoose from "mongoose";

// Schema for creating user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensure 'name' is required
  },
  email: {
    type: String,
    unique: true, // Ensure email is unique
    required: true, // Ensure 'email' is required
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ], // Regex for email validation
  },
  password: {
    type: String,
    required: true, // Ensure 'password' is required
  },
  cartData: {
    type: Object, // Changed this to 'Object' to store cart-related data
    default: {},  // Default to an empty object if no cart data is provided
  },
  date: {
    type: Date,
    default: Date.now, // Default to current date
  },
});

export default mongoose.model('User', userSchema);
