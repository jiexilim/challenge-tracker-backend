const express = require("express");
const router = express.Router();
const Goal = require('../models/goal');

router.get('/', async (req, res) => {
    Goal.find({ userId: req.query.userId })
        .then(goal => res.json(goal))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/create', async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const benefit = req.body.benefit;
    const endDate = req.body.endDate;
    const userId = req.body.userId;

	const newGoal = new Goal({ title, description, benefit, endDate, userId })

	newGoal.save()
		.then(() => res.json("Goal created"))
		.catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;