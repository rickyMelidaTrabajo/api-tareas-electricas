const actions = require('./actions');


let auth = (req, res) => {
    const { username, password } = req.body;
    return actions.auth(username, password, req, res)
}

module.exports = auth;
