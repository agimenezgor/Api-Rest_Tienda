const mongoose = require('mongoose');
const Product = require('./Product')

/**
 * items necesarios para una factura:
 *      - comprobar que el token pertenece a un usuario con role de usuario
 *      usuario
 *      dirección
 *      teléfono de contacto,
 *      - comprobar que existen productos en la compra
 *      - comprobar que los productos están en stock 
 *      - Si existe vendedor, comprobar que existe en la base de datos
 *      
 */


const CartSchema = new mongoose.Schema({
    cartNumber: {
        type: Number,
        unique: true,
        required: [true, "Necesitas un número de factura"]
    },
    userEmail: {
        require: [true, 'Necesitas un usuario para guardar una factura'],
        type: String,
        ref: "User"
    },
    sellerEmail: {
        type: String,
        ref: "Seller",
        default: "Sistema"
    },
    productos: [{
        product: {
            productId: Number,
            cantidad: Number,
            nombre: String,
            precio: Number
        }
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

/* CartSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(9);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
        next()
    } catch (error) {
        next(error)
    }
}) */
const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;