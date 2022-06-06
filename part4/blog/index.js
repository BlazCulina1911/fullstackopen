const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.MONGODB_URI;

console.log("Connecting to MongoDB");
mongoose.connect(mongoUrl)
    .then(() => {
        console.log("Connected!");
    }).catch(() => {
        console.log("Connection failed!");
    });

app.use(cors());
app.use(express.json());

const userRouter = require("./routes/blogs");
app.use("/api/blogs", userRouter);


const PORT = process.env.PORT || 3001;
app.listen(process.env.PORT || 3001, () => {
    console.log(`Application running on PORT ${PORT}`);
});

//placed this export here for the testing section
module.exports = app;