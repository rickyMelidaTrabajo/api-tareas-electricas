const mongoose = require('mongoose');
const app = require('./app');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const port = process.env.PORT;

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true }).then(() => {
    console.log('La conexion a la BD se realizo exitosamente!');
    app.listen(port, () => {
        console.log(`Servidor corriendo en el puerto ${port}`);
    });
}).catch(() => {
    console.log('No se pudo conectar a la BD');
});