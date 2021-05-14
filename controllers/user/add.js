const User = require('../../models/user/auth');

const add = (req, res) => {
    const { username, password, rol } = req.body;

    let newUser = new User({ username, password, rol});
    newUser.save(err=> {
        if(err) {
            res.status(500).send({
                status: 500,
                mesaage: err
            });
        }else {
            res.status(200).send({
                status: 200,
                message: 'Se agrego usuario'
            });
        }
    })
}

module.exports = add;