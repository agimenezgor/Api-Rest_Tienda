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
    }
}

module.exports = CartController;