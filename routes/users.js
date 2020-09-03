const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

/* GET users listing. */

// retorna todos los usuarios
router.get('/all', UserController.getAll);

// retorna un usuario a traves de su email
router.get('/email/:email', UserController.getByEmail);

// retorna todos los usuarios con role de usuario
router.get('/all/user', UserController.getAllUsers);

// retorna todos los usuarios con role de usuario
router.get('/all/seller', UserController.getAllSellers);

// retorna todos los usuarios con role de usuario
router.get('/all/admin', UserController.getAllAdmins);

// inserta un usuario en la base de datos
router.post('/register', UserController.register);

// borra un usuario en la base de datos
router.delete('/delete/:email', UserController.delete);

// Logea un usuario a traves de su email y su contraseña
router.get('/login/:user/:password', UserController.login);

module.exports = router;
