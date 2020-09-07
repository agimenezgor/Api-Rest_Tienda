const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

/* GET products listing. */

// retorna todos los productos
// acceso a todos los roles de usuario
router.get('/all', ProductController.getAll);

// inserta un producto en la base de datos
// acceso solo a adminstradores
router.post('/', ProductController.register);

/* // inserta un producto en la base de datos
// acceso solo a adminstradores
router.post('/', ProductController.register); */

/* // inserta un producto en la base de datos
// acceso solo a adminstradores
router.post('/', ProductController.register); */

// inserta un producto en la base de datos
// acceso solo a adminstradores
/* router.post('/', ProductController.register); */

// inserta un producto en la base de datos
// acceso solo a adminstradores
/* router.post('/', ProductController.register); */

// inserta un producto en la base de datos
// acceso solo a adminstradores
/* router.post('/', ProductController.register); */

// inserta un producto en la base de datos
// acceso solo a adminstradores
/* router.post('/', ProductController.register); */

// inserta un producto en la base de datos
// acceso solo a adminstradores
/* router.post('/', ProductController.register); */

// inserta un producto en la base de datos
// acceso solo a adminstradores
/* router.post('/', ProductController.register); */

module.exports = router;
