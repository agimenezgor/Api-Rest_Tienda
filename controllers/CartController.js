const Cart = require('../models/Cart');

const CartController = {
    async register(req, res){
        try {
            console.log(req.body)
            const cart = await Cart.create(req.body);
            res.send({cart, message: 'Acto de venta creado correctamente'});
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to register the cart', error});
        }
    },
    async update(req, res){
        try {
           const cart = await Cart.findOneAndUpdate({cartNumber:req.body.cartNumber}, req.body, {new:true});
            if(cart){
                res.send({cart, message: 'Acto de venta actualizado correctamente'});
            }else{
                res.send({message: 'Acto de venta no encontrado'});
            } 
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to update the cart', error});
        }
    },
    async getAll(req, res){
        try {
            const carts = await Cart.find();
            res.send(carts);  
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to get all the carts', error});
        }
    },
    async getByCartNumber(req, res){
        try {
            const cart = await Cart.find({cartNumber: req.body.cartNumber});
            res.send(cart);  
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to get the cart by cart number', error});
        }
    },
    async getByUser(req, res){
        try {
            const carts = await Cart.find({userEmail: req.body.userEmail});
            res.send(carts);
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to get the carts by user', error});
        }
    },
    async getBySeller(req, res){
        try {
            const carts = await Cart.find({sellerEmail: req.body.sellerEmail});
            res.send(carts);
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to get the carts by seller', error});
        }
    },
    async updateBySeller(req, res){
        try {
            // comprobar que la factura pertenece al vendedor
            // si es así, actualizar

        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to update the cart by seller', error});
        }
    },
    async storeCollection(req, res){
        try {
            const carts = await Cart.find();
            var collection = 0;
            carts.map(function(cart){
                collection += cart.precioTotal;
            })
            res.send({collection});
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to get the store collection', error});
        }
    }
}

module.exports = CartController;