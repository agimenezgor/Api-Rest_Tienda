const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/products_bbdd', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

}).then(()=>console.log('Conectado correctamente con la base de datos'))
.catch(console.error)