import express from "express";
import { login } from "../controller/user";

const userRoute = express.Router();

userRoute.post("/login", login);
