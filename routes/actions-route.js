const express = require("express");
const router = express.Router();
const Action = require('../models/action');

router.get('/', async (req, res) => {
    Target.find({ targetId: req.query.targetId })
        .then(action => res.json(action))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/create', async (req, res) => {
	Action.insertMany(req.body)
		.then(() => res.json("Action(s) created"))
		.catch(err => res.status(400).json('Error: ' + err));

});

router.delete('/delete', async (req, res) => {
    Action.deleteOne({ _id: req.body.actionId })
        .then(() => res.json("Action deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/edit', async (req, res) => {
    Action.findOneAndUpdate(
        { _id: req.body.actionId },
        {
            $set: {
                title: req.body.title,
                date: req.body.date,
                index: req.body.index,
                isCompleted: req.body.isCompleted
            }
        }).then(() => res.json("Action updated"))
        .catch(err => res.status(400).json('Error: ' + err));

})

module.exports = router;