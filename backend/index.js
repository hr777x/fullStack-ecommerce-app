import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import path from 'path';
import { connectDB } from './config/db.js';
import { upload } from './utils/helper.js';
import { createProduct, removeProduct, uploadProductImage } from './controllers/product.js';


const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Express App is Running');
});
//upload images of products
app.use('/images', express.static('uploads/images'));

app.post('/uploads', upload.single('product'), uploadProductImage)
//create product
app.post('/addProduct', createProduct)
//remove product
app.post('/removeProduct', removeProduct)
//get all products
app.get('/allproducts', );
