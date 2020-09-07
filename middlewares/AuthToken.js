const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

const AccesoVendedor = [
    "/email/:email",
    "/all/user",
    "/all/seller"
];

const AccesoUsuario = [
    "/update/:email"
];

module.exports = function(req, res, next){
    if(req.path != '/users/login' && req.path != '/users/register'){
        if(req.headers.authorization){
            let token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, CONFIG.SECRET_TOKEN, function(error, decoded){
                if(error){
                    return res.status(403).send({message: 'Token incorrecto'});
                }
                if(decoded.role == 'admin'){
                    next();
                }else {
                    if(decoded.role == 'vendedor'){
                        let pathEncontrado = AccesoVendedor.includes(req.path);
                        if(pathEncontrado){
                            next();
                        }else{
                            res.status(403).send({message: 'No tienes suficientes permisos para acceder al contenido'});
                        }
                    }
                    else{
                        // comprobar si está en el array del path
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