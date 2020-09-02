const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El email es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria'],
        minlength: [8, 'La contraseña debe tener como mínimo 8 caracteres']
    },
    role: {
        type: String,
        default: 'usuario',
        enum: ['admin', 'vendedor', 'usuario']
    },
    direccion: {
        type: String,
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;