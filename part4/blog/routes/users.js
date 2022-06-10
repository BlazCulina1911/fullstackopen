const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
    const users = await User.find({}).populate("blogs");

    res.status(200).json(users);
});

usersRouter.post("/", async (req, res) => {
    const {username, name, password} = req.body;
    //Username is being checked at te userSchema but the taks requires an another check
    if(username.length < 3){
        return res.status(400).json({ error: "username must contain atleast 3 characters"});
    }
    if(password.length < 3){
        return res.status(400).json({ error: "password must contain atleast 3 characters"});
    }

    const existingUser = await User.findOne({username});

    if(existingUser) {
        return res.status(400).json({ error: "username must be unique"});
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        name,
        passwordHash
    });

    const savedUser = await user.save();

    res.status(201).send(savedUser);
});

module.exports = usersRouter;