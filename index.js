const mongoose = require('mongoose');
const app = require('./app');
const port = 1900;

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/tareas_electrica', { useNewUrlParser: true }).then(() => {
    console.log('La conexion a la BD se realizo exitosamente!');
    app.listen(port, ()=> {
        console.log(`Servidor corriendo en el puerto ${port}`);
    });
}).catch(()=> {
    console.log('No se pudo conectar a la BD');
})