import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../Assets/upload_area.svg'

const AddProduct = () => {

    const [image, setImage] = useState(false);

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }
  return (
    <div className='add-product'>

    <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input type="text" name='name' placeholder='Type product name...' /> 
    </div>

    <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input type="text" name='old_price' placeholder='Type old price...' />
        </div>

        <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input type="text" name='new_price' placeholder='Type offer price...' />
        </div>
    </div>
    <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select name="category" className='addproduct-selector'>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kids">Kids</option>

        </select>
    </div>
    <div className="addproduct-itemfield">
        <label htmlFor="file-input">
            <p>Product Image</p>
            <img src={image?URL.createObjectURL(image):upload_area} className='add-product-thumbnail-img' alt=""/>
        </label>
        <input onChange={imageHandler} type="file" name='image' className='file-input' hidden/>
    </div>
    <button className='addproduct-button' >ADD</button>
    </div>
  )
}

export default AddProduct