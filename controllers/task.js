const moment = require('moment');
const technician = require('./technician');
const Task = require('../models/task');
const images = require('./foldersAndImages/images');
const folderImages = require('./foldersAndImages/folder');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const os = require('os');


let task = {
    addPendingTask: (req, res) => {
        const _id = new mongoose.Types.ObjectId()
        const username = req.user.username;
        const date_generation = moment().format('YYYY-MM-DD');
        let taskNumber;
        const {
            type,
            state,
            description,
            turn
        } = req.body;

        Task.countDocuments().then(count => {
            taskNumber = count + 1;

            technician.getWhithUsername(username).then(tech => {
                let newPendingTask = new Task({
                    _id,
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
                    if (err) return res.status(500).send({ message: `Error al guardar tarea pendiente ${err}` })

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
      const _id = req.params.id || req.query.id;
      const typeImage = req.params.image || req.query.image;

      const mainRoute = path.join(__dirname, '../task-images/');
      let images = fs.readdirSync(`${mainRoute}/${_id}`);
      let extension = typeImage == 'after' ? images[0].split('.')[1] : images[1].split('.')[1];

      const url = `${mainRoute}/${_id}/${typeImage}.${extension}`;

      res.sendFile(url);
    },

    setImage: (id, image) => {
      const mainUrl = 'http://localhost:1900/api/task/image-task';

      const url = `${mainUrl}?id=${id}&image=${image}`;
      return url;
    },

    addFinishedTask: (req, res) => {
        const _id = new mongoose.Types.ObjectId()
        const username = req.user.username;
        const state = "Finalizado";
        const date_closing = moment().format('YYYY-MM-DD');
        const date_generation = moment().format('YYYY-MM-DD');
        const { type, description, start_time, end_time, hour_man, turn } = JSON.parse(req.body.data);
        const { image_before, image_after } = req.files;
        const extensionImageBefore = image_before.name.split('.')[1];
        const extensionImageAfter = image_after.name.split('.')[1];

        let taskNumber;

        Task.countDocuments().then(count => {
            const mainRoute = 'task-images/';
            const routeImage = `${_id}`

            taskNumber = count + 1;
            folderImages.verifyFolder(_id);

            if(os.platform == 'linux') {
              images.moveImageBefore(image_before.path.split('/')[1], routeImage); //Para linux
              images.moveImageAfter(image_after.path.split('/')[1], routeImage); //para linux
            }else {
              mages.moveImageBefore(image_before.path.split('\\')[1], routeImage); //Para window
              images.moveImageAfter(image_after.path.split('\\')[1], routeImage); //para window
            }

            const imageBefore = task.setImage(_id, 'before');
            const imageAfter = task.setImage(_id, 'after');

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
                    if (err) return res.status(500).send({ message: 'Error al guardar datos en BD' });

                    return res.status(202).send({ message: `Tarea Guardada # ${taskNumber}`, data });
                });

            }).catch(err => {
                return res.status(500).send({ message: 'Error al obtener tecnicos' });
            })
        }).catch(err => {
          console.log(err);
            if (err) return res.status(500).send({ message: `Error al obtener la cantidad de tareas finalizadas ${err}`});
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
