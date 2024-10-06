import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { connectDB } from './config/db.js';
import { upload } from './utils/helper.js';
import { createProduct, removeProduct, uploadProductImage, getAllProducts } from './controllers/product.js';


dotenv.config();

const port = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: 'http://localhost:3000' })); // Allow CORS for your frontend
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
