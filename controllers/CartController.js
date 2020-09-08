const Cart = require('../models/Cart');

const CartController = {
    async register(req, res){
        try {
            const cart = await Cart.create(req.body);
            res.send({cart, message: 'Acto de venta creado correctamente'});
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to register the cart', error});
        }
    },
    /* async update(req, res){
        try {
            
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to update the cart', error});
        }
    }, */
    /* async getAll(req, res){
        try {
            
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to get all the carts', error});
        }
    }, */
    /* async getByUser(req, res){
        try {
            
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to get the carts by user', error});
        }
    }, */
    /* async getBySeller(req, res){
        try {
            
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to get the carts by seller', error});
        }
    }, */
    /* async updateBySeller(req, res){
        try {
            
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to update the cart by seller', error});
        }
    }, */
    /* async storeCollection(req, res){
        try {
            
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to get the store collection', error});
        }
    } */
}

module.exports = CartController;