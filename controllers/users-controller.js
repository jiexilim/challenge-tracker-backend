const User = require("../models/user");

exports.create = function (req, res) {
    const newUser = new User(req.body);
    
    newUser.save(function (err) {
        if (err) {
            return res.json({ status: 'error', error: err.message });
        } else {
            res.json({ status: 'ok', message: 'User created' });
        }
    });
}