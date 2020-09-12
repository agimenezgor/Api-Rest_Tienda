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
           const cart = await Cart.findOneAndUpdate({numeroActoVenta:req.body.numeroActoVenta}, req.body, {new:true});
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
            const cart = await Cart.find({numeroActoVenta: req.body.numeroActoVenta});
            res.send(cart);  
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to get the cart by cart number', error});
        }
    },
    async getByUser(req, res){
        try {
            const carts = await Cart.find({usuario: req.body.usuario});
            res.send(carts);
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to get the carts by user', error});
        }
    },
    async getBySeller(req, res){
        try {
            const carts = await Cart.find({vendedor: req.body.vendedor});
            res.send(carts);
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to get the carts by seller', error});
        }
    },
    async updateBySeller(req, res){
        try {
            const cart = await Cart.findOneAndUpdate({numeroActoVenta: req.body.numeroActoVenta, vendedor: req.body.vendedor}, req.body, {new:true});
            res.send({cart, message: 'Acto de venta actualizado correctamente por el vendedor'})
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to update the cart by seller', error});
        }
    },
    async storeCollection(req, res){
        try {
            const carts = await Cart.find({pagado: true});
            var collection = 0;
            carts.map(function(cart){
                collection += cart.precioTotal;
            })
            res.send({collection});
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to get the store collection', error});
        }
    },
    async payCart(req, res){
        try {
            const cart = await Cart.findOneAndUpdate({numeroActoVenta:req.body.numeroActoVenta},{$set: {pagado: true}}, {new:true});
            if(cart){

                res.send({cart, message: 'Acto de venta pagado correctamente'});
            }else{
                res.send({message: 'Acto de venta no encontrado'});
            } 
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to pay the cart', error});
        }
    },
    async getPaidOutCarts(req, res){
        try {
            const carts = await Cart.find({pagado:true});
            res.send(carts);
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to pay the cart', error});
        }
    }
}

module.exports = CartController;