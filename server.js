const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user");

require("dotenv/config");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(
	process.env.ATLAS_URL,
	{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
	() => console.log("Successsfully connected to database!")
);

const usersRouter = require('./routes/users-route');

app.use('/user', usersRouter);

app.get("/", (req, res) => res.send("Working"));

app.listen(port, () => console.log(`Server is running on port: ${port}`));
