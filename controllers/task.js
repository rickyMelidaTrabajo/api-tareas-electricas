const validator = require('validator');
const fs = require('fs');
const path = require('path');

let task = {
    test: (req, res) => {
        return res.status(200).send({
            message: 'soy la accion test de mi controlador de la tarea'
        });
    },

    addPendingTask: (req, res) => {

    },

    addFinishedTask: (req, res) => {

    },

    showTasks: (req, res) => {

    },


    showTaskBy: (req, res) => {
        
    }

}

module.exports = task;