const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

/* GET products listing. */

// retorna todos los productos
router.get('/', ProductController.getAll);

// inserta un usuario en la base de datos
router.post('/', ProductController.register);
module.exports = router;
