const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

const connectDatabase = async () => await mongoose.connect(
	process.env.ATLAS_URL,
	{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
	() => console.log("Successsfully connected to database!")
);

connectDatabase();

const usersRouter = require('./routes/users-route');

app.use('/user', usersRouter);

app.get("/", (req, res) => res.send("Working"));

app.listen(port, () => console.log(`Server is running on port: ${port}`));
