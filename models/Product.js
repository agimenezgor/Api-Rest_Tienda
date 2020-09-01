const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nombre: {
        unique: true,
        type: String,
        required: [true, 'El nombre es necesario']
    },
    precio: {
        type: String,
        required: [true, 'El precio es necesario']
    },
    categoria: {
        type: String,
        required: [true, 'La categoria es necesaria'],
        enum: ['CATEGORIA1', 'CATEGORIA2', 'CATEGORIA3']
    },
    stock: {
        type: String,
        required: [true, 'El stock es necesario']
    },
});
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;