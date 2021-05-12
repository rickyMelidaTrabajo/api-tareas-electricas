const validator = require('validator');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const username = require('../user/actions');

let task = {
    test: (req, res) => {
        const hour1 = '22:30';
        const hour2 = '23:30';
        const hour_moment1 = moment(hour1, 'HH:mm:ss');
        const hour_moment2 = moment(hour2, 'HH:mm:ss');
        
        //Difference among hour1 and hour2, this give the result in seconds
        // for that divided the result among 3600000
        console.log(hour_moment2.diff(hour_moment1) / 3600000);
        
        return res.status(200).send({
            message: 'soy la accion test de mi controlador de la tarea',
            name: `El nombre del usuario es ${req.session.username}`
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
        const now = moment().format('YYYY-MM-DD');


        res.status(200).send({
            type,
            state,
            description,
            date_generation,
            turn,
            technicians,
            position,
            name: `El nombre del usuario es ${req.session.username}`
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