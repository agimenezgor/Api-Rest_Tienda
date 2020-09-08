const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nombre: {
        unique: true,
        type: String,
        required: [true, 'El nombre es necesario']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es necesario']
    },
    categoria: {
        type: String,
        required: [true, 'La categoria es necesaria'],
        enum: ['utilitario', 'compacto', 'berlina', 'cabrio', 'familiar', 'monovolumen', 'suv']
    },
    stock: {
        type: Number,
        default: 0
    },
    vendidos: {
        type: Number,
        default: 0
    },
});
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;