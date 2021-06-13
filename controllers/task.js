const moment = require('moment');
const technician = require('./technician');
const PendingTask = require('../models/task/pendingSchema');
const FinishedTask = require('../models/task/finishedSchema');
const images = require('./foldersAndImages/images');
const folderImages = require('./foldersAndImages/folder');
const folder = require('./foldersAndImages/folder');
const service = require('../services/auth');


let task = {
    test: (req, res) => {
        const hour1 = '22:30';
        const hour2 = '23:30';
        const hour_moment1 = moment(hour1, 'HH:mm:ss');
        const hour_moment2 = moment(hour2, 'HH:mm:ss');
        //Difference among hour1 and hour2, this give the result in seconds
        // for that divided the result among 3600000
        // console.log(hour_moment2.diff(hour_moment1) / 3600000);

        technician.get(req.session.username).then(result => {
            return res.status(200).send({
                message: 'soy la accion test de mi controlador de la tarea',
                name: `El nombre del usuario es ${req.session.username}`,
                result: result
            });

        }).catch(err => {
            return res.status(500).send({
                message: 'soy la accion test de mi controlador de la tarea',
                name: `El nombre del usuario es ${req.session.username}`,
                result: err
            });
        })

    },

    addPendingTask: (req, res) => {
        const username = req.session.username;
        const user = req.user;
        const date_generation = moment().format('YYYY-MM-DD');
        const {
            type,
            state,
            description,
            turn
        } = req.body;


//        console.log(decoded.payload)

        /*
        technician.getWhithUsername(username).then(tech => {
            let newPendingTask = new PendingTask({
                type,
                state,
                description,
                date_generation,
                turn,
                technician: tech.name,
                position: tech.position
            });

            newPendingTask.save((err, doc) => {
                if (err) {
                    res.status(500).send({
                        status: 'error',
                        message: 'Error al guardar tarea pendiente',
                        err
                    })
                } else {
                    res.status(200).send({
                        status: 'success',
                        message: 'Se guardo correctamente la tarea',
                        doc
                    });
                }
            })

        }).catch(err => {
            res.status(500).send({
                status: 'error',
                message: 'Error al obtener tecnico',
                err
            })
        });*/
    },

    addFinishedTask: (req, res) => {
        const state = "Finalizado";
        const date_closing = moment().format('YYYY-MM-DD');
        const date_generation = moment().format('YYYY-MM-DD');
        const { type, description, start_time, end_time, hour_man, } = req.body;
        const { image_before, image_after } = req.files;

        technician.getWhithUsername(req.session.username).then(tech => {
            let { name, position, turn } = tech;

            let newFinishedTask = new FinishedTask({
                type,
                state,
                description,
                date_generation,
                date_closing,
                start_time,
                end_time,
                hour_man,
                turn,
                name,
                position
            });

            newFinishedTask.save((err, data) => {
                if (err) {
                    return res.status(500).send({
                        message: 'Error al guardar datos en BD',
                        err
                    });
                }
                const routeImage = `${req.session.username}/${data._id}`;
                folderImages.verifyFolderUser(req.session.username);
                folderImages.VerifyFolderTask(req.session.username, data._id);

                images.moveImageBefore(image_before.path.split('\\')[1], routeImage);
                images.moveImageAfter(image_after.path.split('\\')[1], routeImage);

                return res.status(202).send({
                    message: 'Tarea Guardada',
                    data: image_before.path.split('\\')[1]
                });
            });
        }).catch(err => {
            return res.status(200).send({
                message: 'Error al obtener tecnicos',

            });
        })
    },

    showTasks: (req, res) => {

    },


    showTaskBy: (req, res) => {

    }

}

module.exports = task;