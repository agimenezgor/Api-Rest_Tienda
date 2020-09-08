const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

/* GET carts listing. */

// retorna todos los actos de venta
// acceso solo para role admin y vendedor
router.get('/register', CartController.register);

module.exports = router;