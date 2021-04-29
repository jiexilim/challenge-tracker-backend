  
const router = require('express').Router();
let User = require('../models/user');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/register", async (req, res) => {
	const { username, password: plainTextPassword } = req.body;

    if (!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: "Invalid username" });
    }
    
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: "Password must be more than 4 characters" });
    }

    if (plainTextPassword.length < 5) {
        return res.json({ status: 'error', error: "Invalid password" });
    }

	const password = await bcrypt.hash(password, 10);

    try {
        const response = await User.create({
            username,
            password
        })
        console.log("User created successfully: ", response);
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: 'error', error: "Username already in use" });
        }
        throw error;
    }

	res.json({ status: "ok" });
});

module.exports = router;