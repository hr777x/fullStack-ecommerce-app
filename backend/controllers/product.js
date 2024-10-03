import Product from '../models/product-model.js';

export const createProduct = async (req, res) => {
    let products = await Product.find({});
    let id;
    const {name, image, category, new_price, old_price} = req.body;
    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else{
        id = 1;

    }
    const product = new Product({id, name, image, category, new_price, old_price})
    console.log(product);
await product.save();
console.log('Product Saved!');
res.json({
    success : true,
    name : req.body.name,
})
};

export const uploadProductImage = async (req, res) => {
    res.json({
        success : 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
};

export const removeProduct = async (req, res) => {
    const {id, name} = req.body;
    await Product.findOneAndDelete({id})
    res.status(200).json("Product Deleted", success, name, id);
};

export const getAllProducts = async (req, res) => {
    let products = await Product.find({});
    console.log("All Products", products);
    res.send(products);
};

