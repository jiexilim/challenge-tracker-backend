  
const router = require('express').Router();
const controller = require("../controllers/users-controller")
const User = require('../models/user');
const bcrypt = require("bcryptjs");

router.route('/register')
  .post(controller.create)

/**
router.route('/').get((req, res) => {
	User.find()
		.then(users => res.json(users))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.post('/register', (req, res) => {
    const username = req.body.username;
    const plainTextPassword = req.body.password;

    if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password should be at least 4 characters'
		})
	}

    const password = bcrypt.hash(plainTextPassword, 10)

    const newUser = User.create({username, password});

   newUser.save()
    .then(() => res.json({ status: 'ok' }))
    .catch(error => {
        if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		return res.json({ status: 'error', error: error.message })
    });
});

*/
module.exports = router;