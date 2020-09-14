const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

/* GET products listing. */

// inserta un producto en la base de datos
// acceso en desarrollo
router.post('/register/all', ProductController.registerAll);

// inserta un producto en la base de datos
// acceso solo a adminstradores
router.post('/register', ProductController.register);

// elimina un producto en la base de datos
// acceso solo a adminstradores
router.delete('/delete', ProductController.delete);

// actualiza un producto en la base de datos
// acceso solo a administradores
router.put('/update', ProductController.update);

// retorna todos los productos
// acceso a todos los roles de usuario
router.get('/all', ProductController.getAll);

// retorna los productos de la categoría elegida
// acceso a todos los roles de usuario
router.get('/all/category', ProductController.getByCategory);

// retorna los producto dentro de un rango de precios
// acceso a todos los roles de usuario
router.get('/all/price', ProductController.getByPrice);

// retorna todos los productos vendidos por un vendedor
// acceso solo a administradores y vendedores
router.get('/all/seller', ProductController.getBySeller);

// retorna todos los productos vendidos de una categoría
// acceso solo a administradores y vendedores
router.get('/all/category/sold', ProductController.getSoldByCategory);

// retorna todos los productos en stock de una categoría
// acceso a todos los roles de usuario
router.get('/all/category/stock', ProductController.stockByCategory);

// retorna todos los productos en stock de la tienda
// acceso a todos los roles de usuario
router.get('/all/stock', ProductController.allInStock);

module.exports = router;
