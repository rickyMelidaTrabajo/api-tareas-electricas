const fs = require('fs');
const path = require('path');
const Task = require('./task');

const images = {
    getRouteFolder: () => {

    },

    save: () => {

    },

    verifyFolder: (route, user) => {
        relativeRoute = route + '/' + user;

        if (!fs.existsSync(path.resolve(relativeRoute))) {
            this.createFolder(relativeRoute);
        } else {
            return {
                status: 'success',
                mensaje: `La ruta ${relativeRoute} ya existe`
            }
        }
    },

    createFolder: (route) => {
        fs.mkdirSync(path.resolve(route), { recursive: false }, error => {
            if (error) {
                return {
                    status: 'error',
                    mensaje: 'No se pudo crear la carpeta'
                };
            }
        });

        return {
            status: 'success',
            mensaje: `Se crea la carpeta, ahora la ruta es ${route}`
        };
    }
}

module.exports = images;