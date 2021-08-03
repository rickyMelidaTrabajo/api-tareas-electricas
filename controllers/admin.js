const User = require('../models/user/auth');
const service = require('../services/auth');
const Task = require('../models/task');
const moment = require('moment');
const technician = require('./technician');

const signIn = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ rol: 'Admin', username }, (error, userRes) => {
    if (error) return res.status(500).send({ message: error });
    if (!userRes) return res.status(404).send({ message: 'El usuario no es administrador' });

    userRes.isCorrectPassword(password, (err, user) => {
      if (err) return res.status(500).send({ message: 'Error al autenticar' });
      if (!user) return res.status(500).send({ message: 'Contraseña incorrecta.' });

      req.user = user;
      return res.status(200).send({
        message: 'Te has logueado correctamente',
        token: service.createToken(userRes),
        user: userRes.username
      });
    })

  })
}

const verifyToken = (req, res) => {
  const token = req.query.token;
  service.decodeToken(token)
    .then(data => {
      res.status(200).send({ message: 'success', data });
    })
    .catch(error => {
      res.status(500).send({ message: 'Token no valido.' })
    })

}

const getHours = (req, res) => {
  const username = req.query.username;
  let hourTotal;
  let hour = 0;

  technician.getWhithUsername(username)
    .then(tech => {
      Task.find({ state: 'Finalizado', name: tech.name }).exec()
        .then(tasks => {
          for (let task of tasks) {
            hourTotal = moment(task.hour_man, 'HH:mm:ss').add(hour, 'h');
            hour += hourToDecimal(task.hour_man);
          }
          res.status(200).send({ total: hourTotal.format('HH:mm') });
        })
        .catch(err => {
          res.status(500).send({ message: `Error al obtener las tareas ${err}` })
        })
    })
    .catch(err => {
      res.status(500).send({ message: `Error al obtener tecnicos ${err}` })
    });
}

const hourToDecimal = (hour) => {
  try {
    h = parseInt(hour.slice(0, 2));
    m = parseInt(hour.slice(3, 5));

    return (h + (m / 60))

  } catch (error) {
    return 'Tipo de hora no valido'
  }


}



module.exports = { signIn, verifyToken, getHours };
