const Technician = require('../models/technician');
const Task = require('../models/task');
const moment = require('moment');

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

    getTechs: (req, res) => {
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
    },

    getHours: (req, res) => {
      const username = req.query.username;
      let hourTotal;
      let hours = moment('00:00:00', 'HH:mm:ss');
      let h = [];
      technician.getWhithUsername(username)
      .then(tech => {
        Task.find({state: 'Finalizado', name: tech.name }).exec()
        .then(tasks => {
          for(let task of tasks ) {
            // hourTotal = hours.add(moment(task.hour_man, 'HH:mm:ss'), 'HH:mm:ss');
            h.push(task.hour_man)
          }
          res.status(200).send({h});
        })
        .catch(err => {
          res.status(500).send({message: `Error al obtener las tareas ${err}`})
        })
      })
      .catch(err => {
        res.status(500).send({message: `Error al obtener tecnicos ${err}`})
      });
    }
}

module.exports = technician;
