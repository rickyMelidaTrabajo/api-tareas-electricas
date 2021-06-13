const Technician = require('../models/technician/technician');

const technician = {
    test: (req, res) => {
        return res.status(200).send({
            message: 'soy la accion test de mi controlador de los tecnicos',

        });
    },

    getWhithUsername: (username) => {
        let query = Technician.findOne({ username: username });
        return query.exec();
    },

    getOne: (req, res) => {
        const username = req.query.username;

        this.getWhithUsername(username).then(tech => {
            res.status(200).send({
                status: 'Success',
                message: 'Get technician successfull',
                tech
            });
        }).catch(err => {
            res.status(200).send({
                status: 'Success',
                message: 'Get technician successfull',
                err
            });
        })
    }
}

module.exports = technician;