const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

const port = process.env.PORT || 5000;

mongoose.connect(
    process.env.ATLAS_URL,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    () => console.log("Successfully connected to database!")
);

const authRouter = require("./routes/auth");

app.use("/auth", authRouter);

app.get("/", (req, res) => res.send("Working"));

app.listen(port, () => console.log(`Server is running on port: ${port}`));
