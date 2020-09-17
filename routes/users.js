const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

/* GET users listing. */

// retorna todos los usuarios
// acceso solo para role admin
router.get('/all', UserController.getAll);

// retorna un usuario a traves de su email
// acceso solo para roles admin y vendedor
router.get('/email/:email', UserController.getByEmail);

// retorna todos los usuarios con role de usuario
// acceso solo para roles admin y vendedor
router.get('/all/user', UserController.getAllUsers);

// retorna todos los usuarios con role de vendedor
// acceso solo para roles admin y vendedor
router.get('/all/seller', UserController.getAllSellers);

// retorna todos los usuarios con role de administrador
// acceso solo para role admin
router.get('/all/admin', UserController.getAllAdmins);

// inserta un usuario en la base de datos
// acceso a todos los roles
router.post('/register', UserController.register);

// borra un usuario en la base de datos
// acceso solo para role admin
router.delete('/delete/:email', UserController.delete);

// Logea un usuario a traves de su email y su contraseña
// acceso a todos los roles
router.post('/login', UserController.login);

// Actualiza los datos de un usuario
// acceso a todos los roles
router.put('/update/:email', UserController.update);

module.exports = router;
