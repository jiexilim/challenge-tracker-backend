const express = require("express");
const router = express.Router();
const Target = require('../models/target');

router.get('/', async (req, res) => {
    Target.find({ goalId: req.query.goalId })
        .then(target => res.json(target))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/create', async (req, res) => {
    console.log(req.body)
    const newTask = new Target(req.body)

    newTask.save()
        .then(() => res.json("Target created"))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.delete('/delete', async (req, res) => {
    Target.deleteOne({ _id: req.body.targetId })
        .then(() => res.json("Target deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/edit', async (req, res) => {
    if (req.body.type === "recurring") {
        console.log(req.body)
        Target.findOneAndUpdate(
            { _id: req.body.targetId },
            {
                $set: {
                    title: req.body.title,
                    type: req.body.type,
                    dates: req.body.dates,
                    numCompleted: req.body.numCompleted,
                    notes: req.body.notes,
                    isCompleted: req.body.isCompleted,
                    computeRecurDatesInfo: req.body.computeRecurDatesInfo
                }
            }).then(() => res.json("Target updated"))
            .catch(err => res.status(400).json('Error: ' + err));
    } else if (req.body.type === "single") {
        Target.findOneAndUpdate(
            { _id: req.body.targetId },
            {
                $set: {
                    title: req.body.title,
                    type: req.body.type,
                    endDate: req.body.endDate,
                    subtasks: req.body.subtasks,
                    notes: req.body.notes,
                    isCompleted: req.body.isCompleted
                }
            }).then(() => res.json("Target updated"))
            .catch(err => res.status(400).json('Error: ' + err));
    }
})

module.exports = router