const Product = require('../models/Product');
const ProductController = {
    async getAll(req, res) {
        try {
            const products = await Product.find();
            res.send(products);
         } catch (error) {
             console.log(error);
             res.status(500).send({message:'There was a problem trying to get the products', error});
         }
    },
    async register(req, res){
        // falta determinar un rol de usuario
        try {
           const product = await Product.create(req.body);
           res.send({product, message: 'Producto creado correctamente'});
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to register the product', error});
        }
    }
}

module.exports = ProductController;