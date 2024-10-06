import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../Assets/upload_area.svg';

const AddProduct = () => {
    const [image, setImage] = useState(null); // Default to null instead of false
    const [productDetails, setProductDetails] = useState({
        name: "",
        category: "women",
        new_price: "",
        old_price: "",
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]); // Set the selected file
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;
    
        let formData = new FormData();
        formData.append('product', image); // Append the file for upload
        formData.append('name', productDetails.name);
        formData.append('category', productDetails.category);
        formData.append('new_price', productDetails.new_price);
        formData.append('old_price', productDetails.old_price);
    
        // Step 1: Upload the image first
        await fetch('http://localhost:4000/uploads', {
            method: 'POST',
            body: formData
        })
        .then((res) => res.json())
        .then((data) => {
            responseData = data;
        });
    
        // Step 2: If image upload is successful, create the product
        if (responseData.success) {
            product.image = responseData.image_url; // Add the image URL to the product object
            console.log(product);
    
            await fetch('http://localhost:4000/addProduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product) // Send JSON data
            })
            .then((res) => res.json())
            .then((data) => {
                data.success ? alert('Product Added') : alert('Product not added');
            });
        }
    };
    

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input
                    value={productDetails.name}
                    onChange={changeHandler}
                    type="text"
                    name='name'
                    placeholder='Type product name...'
                />
            </div>

            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input
                        value={productDetails.old_price}
                        onChange={changeHandler}
                        type="text"
                        name='old_price'
                        placeholder='Type old price...'
                    />
                </div>

                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input
                        value={productDetails.new_price}
                        onChange={changeHandler}
                        type="text"
                        name='new_price'
                        placeholder='Type offer price...'
                    />
                </div>
            </div>

            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select
                    value={productDetails.category}
                    onChange={changeHandler}
                    name="category"
                    className='addproduct-selector'
                >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kids">Kids</option>
                </select>
            </div>

            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <p>Product Image</p>
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='add-product-thumbnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='image' className='file-input' />
            </div>

            <button onClick={Add_Product} className='addproduct-button'>ADD</button>
        </div>
    );
}

export default AddProduct;
