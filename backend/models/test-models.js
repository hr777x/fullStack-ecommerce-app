import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    Review: {
       //embedding the user in it
        type: Review
    }
});

const reviewSchema = new mongoose.Schema({
    user: {
        type: User,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

const User = mongoose.model('User', userSchema);
const Review = mongoose.model('Review', reviewSchema);
const Product = mongoose.model('Product', productSchema);



import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Product } from './models/test-models'; // Adjust the path as needed

const app = express();
app.use(express.json());

url = process.env.MONGO_URL

mongoose.connect(url);

// JWT secret key
const JWT_SECRET = 'abcd1234567';

// Middleware for JWT authentication
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send({ error: 'Invalid token.' });
    }
};

// Middleware for role-based access control
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send({ error: 'Access denied.' });
        }
        next();
    };
};

// User registration
app.post('/register', async (req, res) => {
    const { firstname, lastname, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role
    });

    await user.save();
    res.send({ message: 'User registered successfully' });
});

// User login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send({ error: 'Invalid email or password.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).send({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET);
    res.send({ token });
});

// Protected route: Delete product (admin only)
app.delete('/products/:id', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.send({ message: 'Product deleted successfully' });
});

// Protected route: Update product stock (admin only)
app.put('/products/:id/stock', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
    const productId = req.params.id;
    const { stock } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).send({ error: 'Product not found.' });
    }

    product.stock = stock;
    await product.save();
    res.send({ message: 'Product stock updated successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


import React from 'react';
import ReactDOM from 'react-dom';
import ProductList from './ProductList';

const App = () => (
  <div>
    <h1>Product List</h1>
    <ProductList />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or category"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {currentProducts.map(product => (
          <li key={product._id}>
            {product.name} - {product.category}
          </li>
        ))}
      </ul>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ProductList;