const mongoose = require('mongoose');
const Product = require('./Product');
const User = require('./User');

/**
 * comprobaciones necesarias para una factura:
 *      - comprobar que el token pertenece a un usuario con role de usuario
 *      - comprobar que existen productos en la compra
 *      - comprobar que los productos están en stock 
 *      - Si existe vendedor, comprobar que existe en la base de datos  
 */


const CartSchema = new mongoose.Schema({
    numeroActoVenta: {
        type: Number,
        unique: true,
    },
    usuario: {
        require: [true, 'Necesitas un usuario para guardar una factura'],
        type: String,
        ref: "User"
    },
    direccion: {
        type: String,
        required: [true, 'Necesitas una dirección para guardar la factura']
    },
    telefono: {
        type: Number,
        min: [99999999, 'El teléfono debe de tener 9 cifras'],
        max: [1000000000, 'El teléfono debe de tener 9 cifras'],
        required: true
    },
    vendedor: {
        type: String,
        ref: "Seller",
        default: "Sistema"
    },
    productos: {
        type: Array,
        required: true
    },
    
    precioTotal: {
        type: Number,
        default: 0
    },
    pagado: {
        type: Boolean,
        default: false
    }
});

CartSchema.pre('save', async function(next) {
    try {
        //comprobar que el usuario existe en la base de datos
        const user = await User.findOne({email:this.usuario, role: 'usuario'});
        if(!user){
            var err = new Error('El usuario no existe en la base de datos');
            next(err);
        }
        //comprobar que el vendedor existe en la base de datos
        if(this.vendedor !== 'Sistema'){
            const seller = await User.findOne({email:this.vendedor, role: 'vendedor'});
            if(!seller){
                var err = new Error('El vendedor no existe en la base de datos');
                next(err);
            }
        }
        // comprobar que los productos existen en la base de datos
        const productos = await Product.find();
        var thisProd = this.productos;
        let encontrados = 0;
        productos.map(function(obj){
            thisProd.map(function(ele) {
                if(obj.nombre === ele.nombre){
                    encontrados++
                    // calcular precio total
                    this.precioTotal +=obj.precio * ele.cantidad;
                    // comprobar que los productos están en stock y que hay suficiente stock
                    if(obj.stock <= 0 || ele.cantidad > obj.stock){
                        console.log("producto: ", obj.nombre);
                        console.log("cantidad en stock: ", obj.stock);
                        console.log("cantidad pedida: ", ele.cantidad);
                        var err = new Error('El producto no tiene suficiente stock');
                        next(err);
                    }
                }
            })
        })
        if(encontrados !== thisProd.length){
            var err = new Error('El producto no existe en la base de datos');
            next(err); 
        }
        // adjudicar número de factura autoincremental
        const carts = await Cart.find();
        this.numeroActoVenta = carts.length + 1

        next()
    } catch (error) {
        next(error)
    }
})
const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;