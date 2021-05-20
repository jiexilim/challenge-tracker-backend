const express = require("express");
const router = express.Router();
const Target = require('../models/target');

router.get('/', async (req, res) => {
    Target.find({ goalId: req.query.goalId })
        .then(target => res.json(target))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/create', async (req, res) => {
    const title = req.body.title;
    const endDate = req.body.endDate;
    const goalId = req.body.goalId;

	const newTarget = new Target({ title, endDate, goalId })

	newTarget.save()
		.then(() => res.json("Target created"))
		.catch(err => res.status(400).json('Error: ' + err));

});

router.delete('/delete', async (req, res) => {
    Target.deleteOne({ _id: req.body.targetId })
        .then(() => res.json("Target deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/edit', async (req, res) => {
    Target.findOneAndUpdate(
        { _id: req.body.targetId },
        {
            $set: {
                title: req.body.title,
                endDate: req.body.endDate,
                isCompleted: req.body.isCompleted
            }
        }).then(() => res.json("Target updated"))
        .catch(err => res.status(400).json('Error: ' + err));

})

module.exports = router;