const mongoose = require("mongoose");
const User = require("../models/user");
const supertest = require("supertest");


//TODO fix tests to run in band without error!

const app = require("../index");

const api = supertest(app);

test("existing invalid users in DB", async () => {
    const response = await api.get("/api/users");

    users = response.body;

    const invalidUsers = users.filter(u => u.username.length < 3);

    console.log(invalidUsers);
    expect(invalidUsers).toHaveLength(0);
}, 50000) 

afterAll(async () => {
    mongoose.connection.close();
    app.close();
});