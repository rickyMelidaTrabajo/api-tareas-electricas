const User = require('../models/user/auth');


let getUsers = (req, res) => {
    User.find().exec()
        .then(user => {
            res.status(200).send({ message: 'success', user });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al obtener los usuarios' });
        })
}

module.exports = {
    getUsers
};
