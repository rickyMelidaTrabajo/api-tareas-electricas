const username = require('../user/actions');
const Technician = require('../../models/technician/technician');

const technician = {
    test: (req, res) => {
        return res.status(200).send({
            message: 'soy la accion test de mi controlador de los tecnicos',
            
        });
    },

    get: (username)=>{
        let query = Technician.findOne({username: username});
        return query.exec();
    }
}

module.exports = technician;