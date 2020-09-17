const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
const User = require('../models/User');

const AccesoVendedor = [
    "/users/email/:email",
    "/users/all/user",
    "/users/all/seller",
    "/users/update/:email",
    "/products/all",
    "/products/all/category",
    "/products/all/price",
    "/products/all/seller",
    "/products/all/category/sold",
    "/products/all/category/stock",
    "/products/all/stock",
    "/carts/register",
    "/carts/update",
    "/carts/all",
    "/carts/cartNumber",
    "/carts/all/user",
    "/carts/all/seller",
    "/carts/update/seller",
    "/carts/store/collection",
    "/carts/pay",
    "/carts/payOut"
];

const AccesoUsuario = [
    "/users/update/:email",
    "/products/all",
    "/products/all/category",
    "/products/all/price",
    "/products/all/stock",
    "/carts/register",
    "/carts/update",
    "/carts/cartNumber",
    "/carts/all/user",
    "/carts/pay"
];

module.exports = async function(req, res, next){
    if(req.path != '/users/login' && req.path != '/users/register'){
        if(req.headers.authorization){
            let token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, CONFIG.SECRET_TOKEN, async function(error, decoded){
                if(error){
                    return res.status(403).send({message: 'Token incorrecto'});
                }
                const user = await User.findOne({email: decoded.email})
                if(!user){
                    return res.status(401).send({message: 'No estás autorizado'});
                }
                if(user.role == 'admin'){
                    next();
                }else {
                    if(user.role == 'vendedor'){
                        let pathEncontrado = AccesoVendedor.includes(req.path);
                        if(pathEncontrado){
                            next();
                        }else{
                            res.status(403).send({message: 'No tienes suficientes permisos para acceder al contenido'});
                        }
                    }
                    else{
                        let pathEncontrado = AccesoUsuario.includes(req.path);
                        if(pathEncontrado){
                            next();
                        }else{
                            res.status(403).send({message: 'No tienes suficientes permisos para acceder al contenido'});
                        }
                    }
                }
            })
        }else{
            res.status(403).send({message: 'Se necesita un token para acceder al contenido'});
        }
    }else{
        next();
    }
}