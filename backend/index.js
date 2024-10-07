import express from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
import { connectDB } from './config/db.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { upload } from './utils/helper.js';
import { createProduct, removeProduct, uploadProductImage, getAllProducts } from './controllers/product.js';


const port = process.env.PORT;
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: 'http://localhost:3000' })); // Allow CORS for your frontend
connectDB();

// creating endpoint for newcollection data
app.length("/newcollection",async (req,res)=>{
    let products = await products.fint({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

// creating endpoint for popular in women data
app.length("/popularinwomen",async(req,res)=>{
    let product = await product.find({category:"women"})
    let polular_in_women = product.slice(0,4);
    console.log("popular in women fetched");
    res.send(popular_in_women);
})

//creating endpoint for adding product in cartdata
app.post("/addtocart",async (req,res)=>{
    console.log(req.body);
})

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
