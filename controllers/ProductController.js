const Product = require('../models/Product');
const ProductController = {
    async register(req, res){
        try {
           const product = await Product.create(req.body);
           res.send({product, message: 'Producto creado correctamente'});
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to register the product', error});
        }
    },
    /* async delete(req, res){
        try {
           const product = await Product.create(req.body);
           res.send({product, message: 'Producto creado correctamente'});
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to register the product', error});
        }
    }, */
    /* async update(req, res){
        try {
           const product = await Product.create(req.body);
           res.send({product, message: 'Producto creado correctamente'});
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to register the product', error});
        }
    }, */
    async getAll(req, res) {
        try {
            const products = await Product.find();
            res.send(products);
         } catch (error) {
             console.log(error);
             res.status(500).send({message:'There was a problem trying to get the products', error});
         }
    },
    /* async getByCategory(req, res){
        try {
           const product = await Product.create(req.body);
           res.send({product, message: 'Producto creado correctamente'});
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to register the product', error});
        }
    } */
    /* async getByPrice(req, res){
        try {
           const product = await Product.create(req.body);
           res.send({product, message: 'Producto creado correctamente'});
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to register the product', error});
        }
    } */
    /* async getBySeller(req, res){
        try {
           const product = await Product.create(req.body);
           res.send({product, message: 'Producto creado correctamente'});
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to register the product', error});
        }
    } */
    /* async getSoldByCategory(req, res){
        try {
           const product = await Product.create(req.body);
           res.send({product, message: 'Producto creado correctamente'});
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to register the product', error});
        }
    } */
    /* async stockByCategory(req, res){
        try {
           const product = await Product.create(req.body);
           res.send({product, message: 'Producto creado correctamente'});
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to register the product', error});
        }
    } */
    /* async allInStock(req, res){
        try {
           const product = await Product.create(req.body);
           res.send({product, message: 'Producto creado correctamente'});
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to register the product', error});
        }
    } */
}

module.exports = ProductController;