const path = require('path');
const fs = require('fs');
const route = path.join(__dirname, '../../../task-images/');

const folder = {

    verifyMainFolder: () => {
        if (!fs.existsSync(route)) {
            fs.mkdirSync(route);
        }
    },

    verifyFolderUser: (username) => {
        this.verifyMainFolder;
        if (!fs.existsSync(`${route}/${username}`)) {
            fs.mkdirSync(`${route}/${username}/`);
        }
    },

    VerifyFolderTask: (username, idTask) => {
        this.verifyMainFolder;
        if (!fs.existsSync(`${route}/${username}/${idTask}`)) {
            fs.mkdirSync(`${route}/${username}/${idTask}`);
        }
    },
}

module.exports = folder;