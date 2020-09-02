const User = require('../models/User');
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
    // Registra un usuario en la base de datos
    async register(req, res){
        // falta determinar un rol de usuario
        try {
            console.log(req.body);
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
    }
}

module.exports = UserController;