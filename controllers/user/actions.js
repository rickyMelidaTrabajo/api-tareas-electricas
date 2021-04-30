const User = require('../../models/user/auth');


const Actions= {
    sessionExist: (req)=> {
        try {
            let dataSession = req.session;
            console.log(req.session);
            return {
                status: 200,
                message: `Bienvenido ${dataSession.username}` 
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
                        // req.session.username = user.username;
                        // console.log(req.session);
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