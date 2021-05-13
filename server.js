const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(process.env.ATLAS_URL,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

const usersRouter = require('./routes/users-route');
const goalsRouter = require('./routes/goals-route');


app.get("/", (req, res) => res.send("Working"));
app.use('/user', usersRouter);
app.use('/goal', goalsRouter);

app.listen(port, () => console.log(`Server is running on port: ${port}`));
