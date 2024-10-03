import mongoose from 'mongoose';
// Schema for Creating product

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true},
    
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    avalible: {
        type: Boolean,
        default: true
    }
    });
    export default mongoose.model('Product', productSchema);