const Product = require('../models/Product');
const coches = require('../ddbb_coches.json');
const Cart = require('../models/Cart');
const ProductController = {
    async registerAll(req, res){
        try {
            await Product.create(coches);
            res.send({product, message: 'Coches subidos a la base de datos'});
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to register all of cars', error});
        }
    },
    async register(req, res){
        try {
           const product = await Product.create(req.body);
           res.send({product, message: 'Producto creado correctamente'});
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to register the product', error});
        }
    },
    async delete(req, res){
        try {
            const product = await Product.findOneAndDelete({nombre:req.body.nombre});
            if(product){
                 res.send({message: 'Producto borrado correctamente', product});
            }else{
             res.send({message: 'Producto no encontrado'});
            }
            
         } catch (error) {
             console.error(error);
             res.status(500).send({message:'There was a problem trying to delete the product', error});
         }
    },
    async update(req, res){
        try {
            const product = await Product.findOneAndUpdate({nombre:req.body.nombre}, req.body, {new:true});
            if(product){
                res.send({product, message: 'Producto actualizado correctamente'});
            }else{
                res.send({message: 'Producto no encontrado'});
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to update the product', error});
        }
    },
    async getAll(req, res) {
        try {
            const products = await Product.find();
            res.send(products);
         } catch (error) {
             console.log(error);
             res.status(500).send({message:'There was a problem trying to get the products', error});
         }
    },
    async getByCategory(req, res){
        try {
            const products = await Product.find({categoria:req.body.categoria});
            res.send(products);
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to get the products by category', error});
        }
    },
    async getByPrice(req, res){
        try {
            const products = await Product.find({precio: {$gte: req.body.mayorQue}, precio: {$lte: req.body.menorQue}});
            res.send(products);
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to get the products by price', error});
        }
    },
    async getBySeller(req, res){
        try {
            // Guardamos los actos de venta
            const carts = await Cart.find({vendedor: req.body.vendedor});
            // Array en el que guardaremos los productos y cantidades vendidas
            var productsArray = new Array();
            // Recorremos los actos de venta
            for(var i = 0; i < carts.length; i++){
                // Recorremos los productos del acto de venta
                for(var j = 0; j < carts[i].productos.length; j++){
                    // Guardamos el producto en un nuevo objeto
                    var prod = new Object();
                    prod.nombre = carts[i].productos[j].nombre;
                    prod.cantidad = carts[i].productos[j].cantidad;
                    // Recorremos el array de actos de venta y comprobamos si el producto existe en el array
                    let encontrado = false;
                    let productIndex = 0;
                    for(let x = 0; x < productsArray.length; x++){
                        if(productsArray[x].nombre === prod.nombre){
                            productIndex = x;
                            encontrado = true;
                            x = productsArray.length;
                        }
                    }
                    // Si existe en el array a devolver, sumamos la cantidad
                    if(encontrado){
                        productsArray[productIndex].cantidad = productsArray[productIndex].cantidad + prod.cantidad;
                    }
                    // Si no existe, hacemos push en el array
                    else{
                        productsArray.push(prod);
                    }
                }
            }   
            res.send(productsArray)
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to get the product of the seller', error});
        }
    },
    async getSoldByCategory(req, res){
        try {
           const products = await Product.find({categoria: req.body.categoria, vendidos: {$gt: 0}});
           res.send(products);
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to get the solded products by category', error});
        }
    },
    async stockByCategory(req, res){
        try {
            const products = await Product.find({stock: {$gt: 0}, categoria: req.body.categoria});
            res.send(products);
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to get the products in stock by category', error});
        }
    },
    async allInStock(req, res){
        try {
            const products = await Product.find({stock: {$gt: 0}});
            res.send(products);
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to get the products in stock', error});
        }
    }
}

module.exports = ProductController;