const User = require('../../models/user/auth');
const Username = require('../../models/user/userSchema');


const Actions= {
    sessionExist: (req)=> {
        try {
            let dataSession = req.session;
            if(dataSession === undefined) {
                return {
                    status: 200,
                    message: `Bienvenido ${dataSession.username}` 
                }
            }else {
                return {
                    status: 500,
                    message: 'No hay una session abierta'
                }    
            }
        } catch (error) {
            return {
                status: 500,
                message: 'No hay una session abierta'
            }
        }
    },

    auth: (username, password, req, res)=> {
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
                        req.session.username = user.username;
                        console.log(req.session.username);
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
    },

    get: (req, res)=> {
        return req.session.username;

    }
}

module.exports = Actions;