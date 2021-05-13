const express = require("express");
const router = express.Router();
const Goal = require('../models/goal');

router.post('/create', async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const benefit = req.body.benefit;
    const userId = req.body.userId;

	const newGoal = new Goal({ title, description, benefit, userId })

	newGoal.save()
		.then(() => res.json('Goal created'))
		.catch(err => res.status(400).json('Error: ' + err));

});

// router.post('/login', async (req, res) => {
// 	const username = req.body.username;
//     const password = req.body.password;

//     const user = await User.findOne({ username: username });

// 	if(!user) {
// 		return res.json("Invalid credentials" );
// 	}

//     try{
//         const match = await bcrypt.compare(password, user.password);
//         const accessToken = jwt.sign({
// 			id: user._id, 
// 			username: user.username
// 		}
// 		, process.env.TOKEN_SECRET)
//         if(match){
//             return res.json({ accessToken: accessToken });
			
//         } else {
//             return res.json("Invalid credentials" );
//         }
//     } catch(err) {
//         return res.status(400).json('Error: ' + err)
//     }
// });

module.exports = router;