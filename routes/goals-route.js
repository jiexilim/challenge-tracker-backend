const express = require("express")
const router = express.Router()
const Goal = require('../models/goal')

router.get('/', async (req, res) => {
    Goal.find({ userId: req.query.userId })
        .then(goal => res.json(goal))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.get('/:id', async (req, res) => {
    Goal.findById(req.params.id)
        .then(goal => res.json({ goal: goal }))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/create', async (req, res) => {
    console.log(req.body)
    const newGoal = new Goal(req.body)

    newGoal.save()
        .then((goal) => res.json({ msg: "Goal created", goalId: goal._id }))
        .catch(err => res.status(400).json('Error: ' + err))

})

router.delete('/:id', async (req, res) => {
    Goal.findByIdAndDelete(req.params.id)
        .then(() => res.json("Goal deleted"))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/update/:id', async (req, res) => {
    Goal.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        benefit: req.body.benefit,
        endDate: req.body.endDate,
        notes: req.body.notes,
    }).then(() => res.json("Goal updated"))
        .catch(err => res.status(400).json('Error: ' + err))

})

module.exports = router