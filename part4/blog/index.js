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

const middleware = require("./utils/middleware");

const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const blogRouter = require("./routes/blogs");

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/blogs", middleware.tokenExtractor, blogRouter);



const PORT = process.env.PORT || 3001;
const server = app.listen(process.env.PORT || 3001, () => {
    console.log(`Application running on PORT ${PORT}`);
});

//placed this export here for the testing section
module.exports = server;