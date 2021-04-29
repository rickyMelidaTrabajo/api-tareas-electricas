const actions = require('./actions');

let auth = (req, res)=>{
    const { username, password } = req.body;

    let resultAction = actions.sessionExist(req);
    if(resultAction.status === 200) {
        return resultAction.message;
    }else {
        return actions.auth(username, password, res) 
    }
}

module.exports = auth;
