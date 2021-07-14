const jwt = require('jsonwebtoken');
const moment = require('moment');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

let createToken = (user) => {
    const payload = {
        username: user.username,
        rol: user.rol,
        iat: moment().unix(),
    }

    return jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: '5h' });
};

let decodeToken = (token) => {
    const decode = new Promise((resolve, reject) => {
        try {
            const payload = jwt.verify(token, process.env.SECRET_TOKEN);

            if (payload.exp <= moment().unix()) {
                reject({ status: 401, message: 'El token ha expirado' });
            }

            resolve(payload);

        } catch (err) {
            reject({ status: 500, message: 'Token invalido' });
        }
    });

    return decode;
}


module.exports = {
    createToken,
    decodeToken,
}
