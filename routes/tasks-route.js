const express = require("express")
const router = express.Router()
const Task = require('../models/task')

router.get('/', async (req, res) => {
    Task.find({ goalId: req.query.goalId })
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/create', async (req, res) => {
    const newTask = new Task(req.body)

    newTask.save()
        .then(() => res.json("Task created"))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.delete('/:id', async (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.json("Task deleted"))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/update/:id', async (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    if (req.body.type === "recurring") {
        Task.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            dates: req.body.dates,
            numCompleted: req.body.numCompleted,
            computeRecurDatesInfo: req.body.computeRecurDatesInfo,
            notes: req.body.notes,
            isCompleted: req.body.isCompleted
        })
            .then(() => res.json("Task updated"))
            .catch(err => res.status(400).json('Error: ' + err));
    } else if (req.body.type === "single") {
        Task.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            endDate: req.body.endDate,
            subtasks: req.body.subtasks,
            notes: req.body.notes,
            isCompleted: req.body.isCompleted
        })
            .then(() => res.json("Task updated"))
            .catch(err => res.status(400).json('Error: ' + err));
    }
})

module.exports = router