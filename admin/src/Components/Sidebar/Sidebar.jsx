import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import addProductIcon from '../../Assets/Product_Cart.svg'
import listProductIcon from '../../Assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
    <Link to='/addproduct' style={{textDecoration: "none"}} className='sidebar-link'>
    <div className="sidebar-item">
        <img src={addProductIcon} alt="" />
        <p>Add Product</p >
    </div>
    </Link>

    <Link to='/listproduct' style={{textDecoration: "none"}} className='sidebar-link'>
    <div className="sidebar-item">
        <img src={listProductIcon} alt="" />
        <p>Product List</p>
    </div>
    </Link>
    </div>
  )
}

export default Sidebar