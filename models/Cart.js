const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    userId: {
        require: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    productos: [{
        productId: Number,
        cantidad: Number,
        nombre: String,
        precio: Number
    }],
    precioTotal: {
        type: Number,
        default: 0
    },
    pagado: {
        type: Boolean,
        default: false
    }
});
const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;