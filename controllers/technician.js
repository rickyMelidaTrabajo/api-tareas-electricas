const Technician = require('../models/technician');

const technician = {
    test: (req, res) => {
        return res.status(200).send({
            message: 'soy la accion test de mi controlador de los tecnicos',

        });
    },

    addTechnician: (req, res) => {
      let { username, name, position, turn } = req.body;

      console.log(req);
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
            res.status(500).send({
                status: 'Success',
                message: 'Get technician successfull',
                err
            });
        })
    }
}

module.exports = technician;
