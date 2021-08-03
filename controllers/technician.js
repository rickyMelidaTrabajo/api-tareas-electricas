const Technician = require('../models/technician');
const Task = require('../models/task');
const moment = require('moment');

const technician = {
    setTechnician: (req, res) => {
        let { username, name, position, turn } = req.body;

        console.log(req);
    },

    getTechnicians: (req, res) => {
        Technician.find({}).exec()
            .then(techs => {
                res.status(200).send({ message: 'success', techs })
            })
            .catch(err => {
                res.status(500).send({ message: 'Error al obtener tecnicos' })
            })
    },

    getWhithUsername: (username) => {
        let query = Technician.findOne({ username: username });
        return query.exec();
    },

    getTechnician: (req, res) => {
        const username = req.query.username;

        this.getWhithUsername(username).then(tech => {
            res.status(200).send({
                status: 'Success',
                message: 'Get technician successfull',
                tech
            });
        }).catch(err => {
            res.status(500).send({
                status: 'Success',
                message: 'Get technician successfull',
                err
            });
        })
    }
}

module.exports = technician;
