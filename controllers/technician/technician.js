const technician = {
    test: (req, res) => {
        return res.status(200).send({
            message: 'soy la accion test de mi controlador de los tecnicos'
        });
    }
}

module.exports = technician;