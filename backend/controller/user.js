import User from "../models/user-model.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false, errors: "existin" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
    date: Date.now(),
  });


  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, JWT_SECRET);
  res.json({ success: true, token });
};

// crate user endpoint for login
  export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "JWT_SECRET");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, error: "Wrong Password" });
    }
  } else {
    res.json({ success: false, error: "Wrong Email Id" });
  }
};

export const addToCart = async(req,res)=>{
  console.log(req.body, req.user)

  let userData = await User.findOne({_id: req.user.id});
  userData.cartData[req.body.itemId] += 1;
  await User.findOneAndUpdate({_id: req.user.id},{cartData: userData.cartData});
  res.send({message: 'Item added to cart'});
}


