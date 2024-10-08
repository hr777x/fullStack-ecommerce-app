import express from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
import { connectDB } from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { upload } from './utils/helper.js';
import { createProduct, removeProduct, uploadProductImage, getAllProducts, getNewCollection, getPopularInWomen } from './controller/product.js';
import { authMiddleware } from './middleware/user-middleware.js';
import { addToCart, getCart, removeFromCart, signUp } from './controller/user.js';


const port = process.env.PORT;
dotenv.config();
const app = express();
app.use(express.json());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: '*' })); // Allow CORS for your frontend
connectDB();

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

// creating endpoint for newcollection data
app.get("/newcollection", getNewCollection);

// creating endpoint for popular in women data
app.get("/popularinwomen", getPopularInWomen);

app.post("/signUp", signUp);

app.post('/addtocart', authMiddleware, addToCart);

//creating endpoint to remove product from cartdata
app.post("/removefromcart", authMiddleware, removeFromCart);

app.post("/getcart", authMiddleware, getCart);