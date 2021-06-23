const path = require('path');
const fs = require('fs');
const mainRoute = path.join(__dirname, '../../task-images/');

const folder = {

    verifyFolderUser: (username) => {
        if (!fs.existsSync(`${mainRoute}${username}`)) {
            fs.mkdirSync(`${mainRoute}${username}/`, { recursive: true }, (err) => {
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
