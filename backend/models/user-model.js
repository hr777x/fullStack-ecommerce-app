import mongoose from "mongoose";


// shema for creating user
const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    cartData: {
        type: Date,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('User', userSchema)