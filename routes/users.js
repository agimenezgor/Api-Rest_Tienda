const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

/* GET users listing. */

// retorna todos los usuarios
router.get('/', UserController.getAll);

// inserta un usuario en la base de datos
router.post('/', UserController.register);

// borra un usuario en la base de datos
router.delete('/:email', UserController.delete);

module.exports = router;
