const jwt = require('jsonwebtoken');
const moment = require('moment');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

let createToken = (user) => {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(5, 'minutes').unix()
    }

    return jwt.sign(payload, process.env.SECRET_TOKEN);
};

let decodeToken = (token) => {
    const decode = new Promise((resolve, reject) => {
        try {
            const payload = jwt.verify(token, process.env.SECRET_TOKEN);

            if(payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                });
            }

            resolve(payload.sub);

        } catch (error) {
            reject({
                status: 500,
                message: 'Token invalido'
            });
        }
    });

    return decode;
}

let decodifyToken = (token) => {
    try {
        
        jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
            if(err) return { message: 'ocurrio un error al verificar el token' };
            
            return {
                message: 'Deberias de obtener tu usuario',
                user: user
            }
        })
    } catch (error) {
        return `No entro al catch`
    }
}


module.exports = {
    createToken,
    decodeToken,
    decodifyToken
}