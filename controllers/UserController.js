const User = require('../models/User');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
const UserController = {
    // devuelve todos los users
    async getAll(req, res) {
        try {
            const users = await User.find();
            res.send(users);
         } catch (error) {
             console.log(error);
             res.status(500).send({message:'There was a problem trying to get the users', error});
         }
    },
    // devuelve todos los users con role de usuario
    async getAllUsers(req, res){
        try {
            const users = await User.find({role:'usuario'});
            res.send(users);
         } catch (error) {
             console.log(error);
             res.status(500).send({message:'There was a problem trying to get all of users', error});
         }
    },
    // devuelve todos los users con role de vendedor
    async getAllSellers(req, res){
        try {
            const users = await User.find({role:'vendedor'});
            res.send(users);
         } catch (error) {
             console.log(error);
             res.status(500).send({message:'There was a problem trying to get all of users', error});
         }
    },
    // devuelve todos los users con role de administrador
    async getAllAdmins(req, res){
        try {
            const users = await User.find({role:'admin'});
            res.send(users);
         } catch (error) {
             console.log(error);
             res.status(500).send({message:'There was a problem trying to get all of users', error});
         }
    },
    // devuelve un usuario al pasarle su correo como parámetro
    async getByEmail(req, res){
        try {
            const user = await User.findOne({email:req.params.email});
            res.send(user);
         } catch (error) {
             console.log(error);
             res.status(500).send({message:'There was a problem trying to get the user', error});
         }
    },
    // Registra un usuario en la base de datos
    async register(req, res){
        try {
            req.body.role = 'usuario';
            const user = await User.create(req.body);
            res.send({user, message: 'Usuario creado correctamente'});
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to register the user', error});
        }
    },
    // Borra un usuario de la base de datos
    async delete(req, res){
        try {
           const user = await User.findOneAndDelete({email:req.params.email});
           if(user){
                res.send({message: 'Usuario borrado correctamente', user});
           }else{
            res.send({message: 'Usuario no encontrado'});
           }
           
        } catch (error) {
            console.error(error);
            res.status(500).send({message:'There was a problem trying to delete the user', error});
        }
    },
    // Logea el usuario en el sistema
    async login(req, res){
        try {
            const user = await User.findOne({email:req.body.email});
            if(!user){
                res.send({message: 'El usuario no existe en la base de datos'});
            }else {
                const isMatch = await user.isValidPassword(req.body.password);
                if(!isMatch){
                    res.send({message: 'La contraseña es incorrecta'});
                }else{
                    payload = {
                        email: user.email,
                        role: user.role
                    }
                    jwt.sign(payload, CONFIG.SECRET_TOKEN, function(error, token){
                        if(error){
                            res.status(500).send({error})
                        }res.send({message: 'Sesión iniciada correctamente', user, token});
                    }) 
                }
            }    
        } catch (error) {
            console.error(error);
            res.status(500).send({message:'There was a problem trying to login the user', error});
        }
    },
    // Actualiza un usuario en la base de datos
    async update(req, res){
        try {
            let token = req.headers.authorization.split(' ')[1];
            const payload = jwt.verify(token, CONFIG.SECRET_TOKEN);
            console.log(payload.email)
            if(req.body.email === payload.email){
                const user = await User.findOneAndUpdate({email:req.body.email}, req.body, {new:true});
                res.send({user, message: 'Usuario actualizado correctamente'});
            }
            res.send({message: 'No tienes acceso a este usuario'});
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to update the user', error});
        }
    },
}

module.exports = UserController;