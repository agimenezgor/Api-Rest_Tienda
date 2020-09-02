const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

/* GET users listing. */

// retorna todos los usuarios
router.get('/', UserController.getAll);

// retorna un usuario a traves de su email
router.get('/email/:email', UserController.getByEmail);

// inserta un usuario en la base de datos
router.post('/', UserController.register);

// borra un usuario en la base de datos
router.delete('/:email', UserController.delete);

// Logea un usuario a traves de su email y su contraseña
router.get('/login/:user/:password', UserController.login);

module.exports = router;
