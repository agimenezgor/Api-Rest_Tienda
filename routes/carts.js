const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

/* GET carts listing. */

// registra un nuevo acto de venta
// acceso para todos los roles de usuario
router.post('/register', CartController.register);

// actualiza un acto de venta
// acceso para todos los roles de usuario
router.put('/update', CartController.update);

// retorna todos los actos de venta
// acceso para roles de administrador y vendedor
router.get('/all', CartController.getAll);

// retorna un acto de venta al pasarle el número de acto de venta como parámetro
// acceso para todos los roles de usuario
router.get('/cartNumber', CartController.getByCartNumber);

// retorna todos los actos de venta de un usuario
// acceso para todos los roles de usuario
router.get('/all/user', CartController.getByUser);

// retorna todos los actos de venta de un vendedor
// acceso solo para role admin y vendedor
router.get('/all/seller', CartController.getBySeller);

// modifica los datos de factura
// acceso solo para role vendedor
router.put('/update/seller', CartController.updateBySeller);

// retorna la recaudación total de la tienda
// acceso solo para role admin y vendedor
router.get('/store/collection', CartController.storeCollection);

// Actualiza el acto de venta como pagado
// acceso a todos los roles de usuario
router.put('/pay', CartController.payCart);

// retorna los actos de venta pagados
// acceso solo para role admin y vendedor
router.get('/paidOut', CartController.getPaidOutCarts);

module.exports = router;