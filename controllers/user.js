const User = require('../models/user/auth');
const service = require('../services/auth');


let signIn = (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username }, (error, userRes) => {
        if (error) return res.status(500).send({ message: error });
        if (!userRes) return res.status(404).send({ message: 'No existe el usuario' });

        userRes.isCorrectPassword(password, (err, user) => {
            if (err) return res.status(500).send({ message: 'Error al autenticar' });
            if (!user) return res.status(500).send({ message: 'Contraseña incorrecta.' });

            req.user = user;
            return res.status(200).send({
                message: 'Te has logueado correctamente',
                token: service.createToken(userRes),
                user: userRes.username,
                rol: userRes.rol
            });
        })
    });
}

let signUp = (req, res) => {
    const { username, password, rol } = req.body;

    let newUser = new User({ username, password, rol });
    newUser.save(err => {
        if (err) return res.status(500).send({ message: `Error al crear usuario ${err}` });

        return res.status(200).send({ token: service.createToken(newUser) });
    })
}

let getUsers = (req, res) => {
  User.find().exec()
    .then(user => {
      res.status(200).send({message: 'success', user });
    })
    .catch(err=>{
      res.status(500).send({message: 'Error al obtener los usuarios'});
    })
}

module.exports = {
    signIn,
    signUp,
    getUsers
};
