const validator = require('validator');

let user = {
    test: (req, res) => {
        return res.status(200).send({
            message: 'soy la accion test de mi controlador de los usuarios'
        });
    },
    auth: () => {

    },

    get: () => {

    },

    add: (req, res) => {
        const { username, password } = req.body;
        
        return res.status(200).send({
            username,
            password
        });
    }

}

module.exports = user;