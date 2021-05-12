const username = require('../user/actions');

const technician = {
    test: (req, res) => {
        return res.status(200).send({
            message: 'soy la accion test de mi controlador de los tecnicos'
        });

        console.log(username.get('ricky'));
    },

    get: (req, res)=>{
        return 'This is get of technician';
    }
}

module.exports = technician;