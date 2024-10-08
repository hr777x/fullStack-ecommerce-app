import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const signUp = async (req, res) => {
  console.log(req.body);
  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false, error: "User already exists" });
  }

  const { name, email, password } = req.body; // Destructure the incoming request body
  
  // Check if password is provided
  if (!password) {
    return res.status(400).json({ success: false, error: "Password is required" });
  }

  const saltRounds = 10; // You can adjust this value
  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password
  } catch (err) {
    return res.status(500).json({ success: false, error: "Error hashing password" });
  }

  const cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new User({
    name,
    email,
    password: hashedPassword, // Use the hashed password
    cartData: cart,
    date: Date.now(),
  });
// Ensure JWT_SECRET is defined
    try {
      await user.save();
      const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
      return res.status(201).json({ success: true, token, message: "User created successfully!" });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
};


// Login controller
export const login = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid Email" });
    }

    // Compare the password with the hashed password in the DB
    const passCompare = await bcrypt.compare(req.body.password, user.password);
    if (!passCompare) {
      return res.status(400).json({ success: false, error: "Invalid Password" });
    }

    // Prepare the JWT payload
    const data = {
      user: {
        id: user.id,
      },
    };

    // Sign the token with the secret from env variables
    const token = jwt.sign(data, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Add to cart controller (protected route)
export const addToCart = async (req, res) => {
  try {
    console.log("Added",req.body.itemId);
    // Find the user by ID (extracted from token)
    let userData = await User.findOne({ _id: req.user.id });

    // Add item to cart
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });

    res.send({ message: "Item added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

export const removeFromCart = async (req,res)=>{
  console.log("Removed",req.body.itemId);
  let userData = await User.findOne({_id: req.user.id});
  if(userData.cartData[req.body.itemId] >0)
  userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({_id: req.user.id},{cartData: userData.cartData});
  res.send({message: 'Item removed from cart'});
};

//creating end_point for getting cartdata
export const getCart = async (req,res)=>{
console.log("Get Cart");
let userData = await Users.findOne({_id:req.user.id});
res.json(userData.cartData);
};
