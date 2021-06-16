
const express = require("express")
const router = express.Router()
const User = require('../models/user')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post('/register', async (req, res) => {
    const username = req.body.username
    const plainTextPassword = req.body.password

    const password = await bcrypt.hash(plainTextPassword, 10)

    const newUser = new User({ username, password })

    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error: ' + err))

});

router.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = await User.findOne({ username: username })

    if (!user) {
        return res.json("Invalid credentials")
    }

    try {
        const match = await bcrypt.compare(password, user.password)
        const accessToken = jwt.sign({
            id: user._id,
            username: user.username
        }
            , process.env.TOKEN_SECRET)
        if (match) {
            return res.json({ accessToken: accessToken })

        } else {
            return res.json("Invalid credentials")
        }
    } catch (err) {
        return res.status(400).json('Error: ' + err)
    }
})

module.exports = router