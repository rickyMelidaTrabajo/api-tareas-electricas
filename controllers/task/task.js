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
        const {
            type,
            state,
            description,
            date_generation,
            turn,
            technicians,
            position
        } = req.body;

        if(validator.isDate('2020-05-06')) {
            console.log('Si es una hora');
        }else {
            console.log('Hora no valida');
        }

        res.status(200).send({
            type,
            state,
            description,
            date_generation,
            turn,
            technicians,
            position
        })
    },

    addFinishedTask: (req, res) => {
        const {
            type,
            state,
            description,
            date_generation,
            date_closing,
            start_time,
            end_time,
            hour_man,
            turn,
            technicians,
            position
        } = req.body;

        const { image_before, image_after } = req.files;

        console.log(req.files);

        return res.status(200).send({
            message: 'Success',
            image_before, 
            image_after
        });
    },

    showTasks: (req, res) => {

    },


    showTaskBy: (req, res) => {

    }

}

module.exports = task;