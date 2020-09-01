const User = require('../models/User');
const UserController = {
    async getAll(req, res) {
        try {
            const users = await User.find();
            res.send(users);
         } catch (error) {
             console.log(error);
             res.status(500).send({message:'There was a problem trying to get the users', error});
         }
    },
    async register(req, res){
        // falta determinar un rol de usuario
        try {
           const user = await User.create(req.body);
           res.send({user, message: 'Usuario creado correctamente'});
        } catch (error) {
            console.log(error);
            res.status(500).send({message:'There was a problem trying to register the user', error});
        }
    }
}

module.exports = UserController;