const User = require('../models/user/auth');
const service = require('../services/auth');

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
  console.log(token);
  service.decodeToken(token)
    .then(data => {
      res.status(200).send({ message: 'success', data });
    })
    .catch(error => {
      res.status(404).send({ message: 'Token no valido.' })
    })

}


module.exports = { signIn, verifyToken };
