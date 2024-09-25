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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});