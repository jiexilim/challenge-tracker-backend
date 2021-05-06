const express = require("express");
const cors = require('cors');
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

const client = new MongoClient(process.env.ATLAS_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);

const usersRouter = require('./routes/users-route');

app.get("/", (req, res) => res.send("Working"));
app.use('/user', usersRouter);

app.listen(port, () => console.log(`Server is running on port: ${port}`));
