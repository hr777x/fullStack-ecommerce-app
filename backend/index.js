import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import path from 'path';
import { connectDB } from './config/db.js';


const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

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