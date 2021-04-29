const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
	bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
		if (err) {
			res.json({
				err: er,
			});
		}

		let user = new User({
			username: req.body.username,
			password: hashedPass,
		});
		user
			.save()
			.then((user) => {
				res.json({
					message: "User added successfully!",
				});
			})
			.catch((error) => {
				res.json({
					message: "An error occurred!",
				});
			});
	});
};

module.exports = {
    register
}