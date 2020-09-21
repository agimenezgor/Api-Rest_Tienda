const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
const User = require('../models/User');

const SellerAccess = [
    "/users/email/:email",
    "/users/all/user",
    "/users/all/seller",
    "/users/:email",
    "/products/",
    "/products/all/category",
    "/products/all/price",
    "/products/all/seller",
    "/products/all/category/sold",
    "/products/all/category/stock",
    "/products/all/stock",
    "/carts/register",
    "/carts/update",
    "/carts",
    "/carts/cartNumber",
    "/carts/all/user",
    "/carts/all/seller",
    "/carts/update/seller",
    "/carts/store/collection",
    "/carts/pay",
    "/carts/payOut"
];

const UserAccess = [
    "/users/update",
    "/products/",
    "/products/all/category",
    "/products/all/price",
    "/products/all/stock",
    "/carts/register",
    "/carts/update",
    "/carts/cartNumber",
    "/carts/all/user",
    "/carts/pay"
];
function authArray(array, string){
    if(array.includes(string)){
        return true;
    }
    else{
        return false;
    }
}

function authPath(array, path){
    var strpath = path.split('/');
    var lnght = strpath.length - 1;
    if(lnght === 1 || lnght === 4){
        if(authArray(array, path)){return true;}
        else{return false;}
    }
    else if(lnght === 3){
        var stringpath = '/' + strpath[1] + '/' + strpath[2];
        if(strpath[3].includes('@')){
            stringpath += '/:email'; 
        }else{
            stringpath += '/';
            stringpath += strpath[3];
        }
        if(authArray(array, stringpath)){return true;}
        else{return false;}
    }
    else if(lnght === 2){
        var stringpath = '/' + strpath[1];
        if(strpath[2].includes('@')){
            stringpath += '/:email'; 
        }else{
            stringpath += '/';
            stringpath += strpath[2];
        }
        if(authArray(array, stringpath)){return true;}
        else{return false;}
    }
}

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
                        let pathFound = authPath(SellerAccess, req.path);
                        if(pathFound){
                            next();
                        }else{
                            res.status(403).send({message: 'No tienes suficientes permisos para acceder al contenido'});
                        }
                    }
                    else{
                        let pathFound = authPath(UserAccess, req.path);
                        if(pathFound){
                            next();
                        }else{
                            res.status(403).send({message: 'No tienes suficientes permisos para acceder al contenido con tu perfil de usuario'});
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