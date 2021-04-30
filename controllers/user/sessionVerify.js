const actions = require('./actions');

let auth = (req, res) => {

    let existsOpenSession = actions.sessionExist(req);
    res.status(200).send(existsOpenSession);
}

module.exports = auth;
