const path = require('path');
const fs = require('fs');
const mainRoute = path.join(__dirname, '../../task-images/');

const folder = {

    verifyFolder: (_id) => {
        if (!fs.existsSync(`${mainRoute}${_id}`)) {
            fs.mkdirSync(`${mainRoute}${_id}/`, { recursive: true }, (err) => {
                if (err) console.log(`No se pudo crear la carpeta ${err}`)
            });
        }
    },

    VerifyFolderTask: (username, idTask) => {
        if (!fs.existsSync(`${mainRoute}${username}/${idTask}`)) {
            fs.mkdirSync(`${mainRoute}${username}/${idTask}`, { recursive: true }, (err) => {
                if (err) console.log(`No se pudo crear la carpeta ${err}`)
            });
        }
    },
}

module.exports = folder;
