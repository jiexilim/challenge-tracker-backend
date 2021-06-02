const express = require("express");
const router = express.Router();
const Goal = require('../models/goal');

router.get('/', async (req, res) => {
    Goal.find({ userId: req.query.userId })
        .then(goal => res.json(goal))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/create', async (req, res) => {
    console.log(req.body)
    const title = req.body.title;
    const benefit = req.body.benefit;
    const endDate = req.body.endDate;
    const tags = req.body.tags;
    const userId = req.body.userId;

	const newGoal = new Goal({ title, benefit, endDate, tags, userId })

	newGoal.save()
		.then((goal) => res.json({ msg:"Goal created", goalId: goal._id }))
		.catch(err => res.status(400).json('Error: ' + err));

});

router.delete('/delete', async (req, res) => {
    Goal.deleteOne({ _id: req.body.goalId })
        .then(() => res.json("Goal deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/edit', async (req, res) => {
    Goal.findOneAndUpdate(
        { _id: req.body.goalId },
        {
            $set: {
                title: req.body.title,
                description: req.body.description,
                benefit: req.body.benefit,
                endDate: req.body.endDate
            }
        }).then(() => res.json("Goal updated"))
        .catch(err => res.status(400).json('Error: ' + err));

})


module.exports = router;