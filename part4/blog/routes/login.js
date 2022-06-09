const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
    const {username, password} = req.body;    
    const existingUser = await User.findOne({username});

    if(!existingUser) {
        return res.status(400).json({error: "username doesn't exist"});
    }

    const passwordCheck = await bcrypt.compare(password, existingUser.passwordHash);

    if(!passwordCheck) {
        return res.status(400).json({error: "password not correct"});
    }

    userForToken = {
        username: existingUser.username,
        id: existingUser.id
    }

    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        {expiresIn: 60*60}
        );

    return res.status(200).json(token);
})

module.exports = loginRouter