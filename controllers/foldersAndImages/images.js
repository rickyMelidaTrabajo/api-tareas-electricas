const fs = require('fs');
const path = require('path');
const routeAsolute = path.join(__dirname, '../../../');

const images = {
    renameImageBefore: (imageBefore) => {
        let extension = imageBefore.split('.')[1];
        let oldName = routeAsolute + imageBefore;
        let newName = `${routeAsolute}upload/before.${extension}`;

        fs.renameSync(oldName, newName);
    },

    renameImageAfter: (imageAfter) => {
        let extension = imageAfter.split('.')[1];
        let oldName = routeAsolute + imageAfter;
        let newName = `${routeAsolute}upload/after.${extension}`;

        fs.renameSync(oldName, newName);
    },

    moveImageBefore: (imageBefore, route) => {
        let extension = imageBefore.split('.')[1];
        let oldRoute = `${routeAsolute}api/upload/${imageBefore}`;
        let newRoute = `${routeAsolute}task-images/${route}/before.${extension}`;
        fs.rename(oldRoute, newRoute, err => {
            if (err) {
                return 'Ha ocurrido un error';
            }

            return 'Se ha movido y modificado el nombre del archivo';
        });
    },

    moveImageAfter: (imageAfter, route) => {
        let extension = imageAfter.split('.')[1];
        let oldRoute = `${routeAsolute}api/upload/${imageAfter}`;
        let newRoute = `${routeAsolute}task-images/${route}/after.${extension}`;
        fs.rename(oldRoute, newRoute, err => {
            if (err) {
                return 'Ha ocurrido un error';
            }

            return 'Se ha movido y modificado el nombre del archivo';
        });

    },
}

module.exports = images;