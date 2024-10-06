import Product from '../models/product-model.js';

export const createProduct = async (req, res) => {
    try {
        let products = await Product.find({});
        let id;
        const { name, category, new_price, old_price } = req.body;
        const image = req.body.image; // image is now part of req.body, not req.file

        if (products.length > 0) {
            let last_product = products.slice(-1)[0]; // Extract the last product
            id = last_product.id + 1; // Increment the last product's ID
        } else {
            id = 1;
        }

        // Create a new product instance
        const product = new Product({ id, name, image, category, new_price, old_price });

        // Save the product to the database
        await product.save();
        console.log('Product Saved!');

        // Respond to the client
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ success: false, message: 'Failed to create product' });
    }
};



export const uploadProductImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Assuming you're storing files in a folder named 'images'
        const imageUrl = `http://${req.headers.host}/uploads/${req.file.filename}`;

        res.json({
            success: true, // Change success to true
            image_url: imageUrl
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ success: false, message: 'Failed to upload image' });
    }
};



export const removeProduct = async (req, res) => {
    try {
        const { id, name } = req.body;
        const product = await Product.findOneAndDelete({ id });

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Product Deleted',
            name,
            id,
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ success: false, message: 'Failed to delete product' });
    }
};


export const getAllProducts = async (req, res) => {
    let products = await Product.find({});
    console.log("All Products", products);
    res.send(products);
};

