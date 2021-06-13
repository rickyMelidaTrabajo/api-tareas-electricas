const moment = require('moment');
const technician = require('./technician');
const PendingTask = require('../models/task/pendingSchema');
const FinishedTask = require('../models/task/finishedSchema');
const images = require('./foldersAndImages/images');
const folderImages = require('./foldersAndImages/folder');

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
        const username = req.user;
        const date_generation = moment().format('YYYY-MM-DD');
        let taskNumber;
        const {
            type,
            state,
            description,
            turn
        } = req.body;

        PendingTask.countDocuments().then(count => {
            taskNumber = count + 1;

            technician.getWhithUsername(username).then(tech => {
                let newPendingTask = new PendingTask({
                    taskNumber,
                    type,
                    state,
                    description,
                    date_generation,
                    turn,
                    technician: tech.name,
                    position: tech.position
                });

                newPendingTask.save((err, doc) => {
                    if (err) return res.status(500).send({ message: 'Error al guardar tarea pendiente', })

                    return res.status(200).send({ message: 'Se guardo correctamente la tarea', });
                });

            }).catch(err => {
                res.status(500).send({ message: 'Error al obtener tecnico' })
            });

        }).catch(err => {
            res.status(500).send({ message: 'Error al obtener la cantidad de tareas pendientes.' })
        })

    },

    addFinishedTask: (req, res) => {
        const username = req.user;
        const state = "Finalizado";
        const date_closing = moment().format('YYYY-MM-DD');
        const date_generation = moment().format('YYYY-MM-DD');
        const { type, description, start_time, end_time, hour_man, } = req.body;
        const { image_before, image_after } = req.files;

        const extensionImageBefore = image_before.name.split('.')[1];
        const extensionImageAfter = image_after.name.split('.')[1];

        let taskNumber;

        FinishedTask.countDocuments().then(count => {
            taskNumber = count + 1;

            const mainRoute = 'task-images/';
            folderImages.verifyFolderUser(username);
            folderImages.VerifyFolderTask(username, String(taskNumber));

            const routeImage = `${username}/${taskNumber}`;

            images.moveImageBefore(image_before.path.split('\\')[1], routeImage);
            images.moveImageAfter(image_after.path.split('\\')[1], routeImage);

            const imageBefore = `${mainRoute}${routeImage}/before.${extensionImageBefore}`;
            const imageAfter = `${mainRoute}${routeImage}/after.${extensionImageAfter}`;

            technician.getWhithUsername(username).then(tech => {
                let { name, position, turn } = tech;

                let newFinishedTask = new FinishedTask({
                    taskNumber,
                    type,
                    state,
                    description,
                    date_generation,
                    date_closing,
                    start_time,
                    end_time,
                    hour_man,
                    imageBefore,
                    imageAfter,
                    turn,
                    name,
                    position
                });

                newFinishedTask.save((err, data) => {
                    if (err) return res.status(500).send({ message: 'Error al guardar datos en BD' });

                    return res.status(202).send({ message: 'Tarea Guardada' });
                });

            }).catch(err => {
                return res.status(500).send({ message: 'Error al obtener tecnicos' });
            })
        }).catch(err => {
            if (err) return res.status(500).send({ message: 'Error al obtener la cantidad de tareas finalizadas.' });
        })



    },

    showPendingTasks: (req, res) => {
        PendingTask.find({}, (err, tasks) => {
            if (err) return res.status(500).send({ message: 'Error a ver tareas pendientes' });
            if (!tasks) return res.status(204).send({ message: 'No hay tareas pendientes' })

            return res.status(200).send({ tasks })
        })
    },

    showFinishedTasks: (req, res) => {
        FinishedTask.find({}, (err, tasks) => {
            if (err) return res.status(500).send({ message: 'Error a ver tareas finalizadas.' })
            if (!tasks) return res.status(204).send({ message: 'No hay tareas finalizadas' })

            return res.status(200).send({ tasks });

        })
    },

    showTaskBy: (req, res) => {
        const searchBy = req.query.type;
        const searchData = req.query.data;

        PendingTask.find({ type: 'TIC', })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

        res.send('buscar por')


    }

}

module.exports = task;