import express from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
import { connectDB } from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { upload } from './utils/helper.js';
import { createProduct, removeProduct, uploadProductImage, getAllProducts } from './controller/product.js';
import fetchUser from './middleware/user-middleware.js';


const port = process.env.PORT;
dotenv.config();
const app = express();
app.use(express.json());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: 'http://localhost:3000' })); // Allow CORS for your frontend
connectDB();

// creating endpoint for newcollection data
app.get("/newcollection",async (req,res)=>{
    let products = await products.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

// creating endpoint for popular in women data
app.get("/popularinwomen",async(req,res)=>{
    let product = await product.find({category:"women"})
    let popular_in_women = product.slice(0,4);
    console.log("popular in women fetched");
    res.send(popular_in_women);
})


app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log(req.body, req.user)

    let userData = await Users.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id: req.user.id},{cartData: userData.cartData});
    res.send({message: 'Item added to cart'});
})

//creating endpoint to remove product from cartdata

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



app.get('/', (req, res) => {
    res.send('Express App is Running');
});

// Serve static images from the uploads directory
app.use('/images', express.static('uploads/images'));

// File upload route
app.post('/uploads', upload.single('product'), uploadProductImage);  // Handles image upload
app.post('/addProduct', createProduct);  // Handles adding a new product
app.post('/removeProduct', removeProduct);  // Handles removing a product
app.get('/allproducts', getAllProducts);  // Retrieves all products
