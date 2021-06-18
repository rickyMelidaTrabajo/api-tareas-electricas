const service = require('../services/auth');

let isAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No puedes ver esta pagina, no tienes autorizacion' });
    }
    const token = req.headers.authorization.split(' ')[1];

    service.decodeToken(token)
        .then(result => {
            req.user = result;
            next();
        })
        .catch(result => {
            res.status(result.status).send({ message: result.message });
        });
}

module.exports = isAuth;