const moment = require('moment');
const technician = require('./technician');
const Task = require('../models/task');
const images = require('./foldersAndImages/images');
const folderImages = require('./foldersAndImages/folder');
const mongoose = require('mongoose');
const path = require('path');


let task = {
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

        console.log(username);
        Task.countDocuments().then(count => {
            taskNumber = count + 1;

            technician.getWhithUsername(username).then(tech => {
                let newPendingTask = new Task({
                    taskNumber,
                    type,
                    state,
                    description,
                    date_generation,
                    turn,
                    name: tech.name,
                    position: tech.position
                });

                newPendingTask.save((err, doc) => {
                    if (err) return res.status(500).send({ message: 'Error al guardar tarea pendiente' })

                    return res.status(200).send({ message: `Se guardo correctamente la tarea # ${taskNumber}`, taskNumber });
                });


            }).catch(err => {
                res.status(500).send({ message: `Error al obtener tecnico, ${err}` })
            });

        }).catch(err => {
            res.status(500).send({ message: 'Error al obtener la cantidad de tareas pendientes.' })
        })

    },

    getImage: (req, res) => {
      const _id = req.params.id;
      const mainRoute = path.join(__dirname, '../task-images/');
      res.sendFile(`${mainRoute}/${_id}/before.png`);
    },

    addFinishedTask: (req, res) => {
        const _id = new mongoose.Types.ObjectId()
        const username = req.user;
        const state = "Finalizado";
        const date_closing = moment().format('YYYY-MM-DD');
        const date_generation = moment().format('YYYY-MM-DD');
        const { type, description, start_time, end_time, hour_man } = req.body || JSON.parse(req.body.data);
        const { image_before, image_after } = req.files;
        const extensionImageBefore = image_before.name.split('.')[1];
        const extensionImageAfter = image_after.name.split('.')[1];

        let taskNumber;


        Task.countDocuments().then(count => {
            taskNumber = count + 1;

            const mainRoute = 'task-images/';
            folderImages.verifyFolder(_id);
            //folderImages.VerifyFolderTask(username, String(taskNumber));

            //const routeImage = `${username}/${taskNumber}`;
            const routeImage = `${_id}`

            //images.moveImageBefore(image_before.path.split('\\')[1], routeImage); //Para window
            images.moveImageBefore(image_before.path.split('/')[1], routeImage); //Para linux
            //images.moveImageAfter(image_after.path.split('\\')[1], routeImage); //para window
            images.moveImageAfter(image_after.path.split('/')[1], routeImage); //para linux


            const imageBefore = `${mainRoute}${routeImage}/before.${extensionImageBefore}`;
            const imageAfter = `${mainRoute}${routeImage}/after.${extensionImageAfter}`;

            technician.getWhithUsername(username).then(tech => {
                let { name, position, turn } = tech;

                let newFinishedTask = new Task({
                    _id,
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
                    console.log(err);
                    if (err) return res.status(500).send({ message: 'Error al guardar datos en BD' });


                    return res.status(202).send({ message: 'Tarea Guardada', data });
                });

            }).catch(err => {
                return res.status(500).send({ message: 'Error al obtener tecnicos' });
            })
        }).catch(err => {
            if (err) return res.status(500).send({ message: `Error al obtener la cantidad de tareas finalizadas ${err}` });
        });






    },

    showTasks: (req,res) => {
      Task.find({}, (err, tasks) => {
        if (err) return res.status(500).send({ message: 'Error a ver tareas pendientes' });
        if (!tasks) return res.status(204).send({ message: 'No hay ninguna tarea' });

        return res.status(200).send({ tasks });
      })
    },

    showPendingTasks: (req, res) => {
        Task.find({ state: 'Pendiente' }, (err, tasks) => {
            if (err) return res.status(500).send({ message: 'Error a ver tareas pendientes' });
            if (!tasks) return res.status(204).send({ message: 'No hay tareas pendientes' });

            return res.status(200).send({ tasks });
        })
    },

    showFinishedTasks: (req, res) => {
        Task.find({ state: 'Finalizado' }, (err, tasks) => {
            if (err) return res.status(500).send({ message: 'Error a ver tareas finalizadas.' })
            if (!tasks) return res.status(204).send({ message: 'No hay tareas finalizadas' })

            return res.status(200).send({ tasks });

        })
    },

    showTaskBy: (req, res) => {
        const searchBy = req.query.type;
        const searchData = req.query.data;

        console.log({searchBy, searchData});

        Task.find({ type: 'TIC', })
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
