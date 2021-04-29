const session = require('express-session');
const User = require('../../models/user/auth');

const Actions= {
    sessionExist: (req)=> {
        try {
            let dataSession = req.session.user;

            return {
                status: 200,
                message: `Bienvenido ${dataSession}` 
            }
        } catch (error) {
            return {
                status: 500,
                message: 'No se hay una session abierta'
            }
        }
    },

    auth: (username, password, res)=> {
        User.findOne({username}, (err, user)=> {
            if(err){
                res.status(500).send({
                    status: 500,
                    message: 'Error al autenticar al usuario'
                });
            }else {
                user.isCorrectPassword(password, (err, result)=>{
                    if(err) {
                        res.status(500).send({
                            status: 500,
                            message: 'Error al autenticar'
                        });
                    }else if(result){
                        res.status(200).send({
                            status: 200,
                            message: 'Usuario autenticado correctamente!',
                        })
                    }else {
                        res.status(500).send({
                            status: 500,
                            message: 'Usuario y/o contrasenya incorrecta.'
                        })
                    }
                })
            }
        });
    }
}

module.exports = Actions;