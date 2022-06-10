const mongoose = require("mongoose");
const supertest = require("supertest");


//This is just here because of an exercise.

const app = require("../index");

const api = supertest(app);

test("existing invalid users in DB", async () => {
    const response = await api.get("/api/users");

    const users = response.body;

    const invalidUsers = users.filter(u => u.username.length < 3);

    console.log(invalidUsers);
    expect(invalidUsers).toHaveLength(0);
}, 50000); 

afterAll(async () => {
    mongoose.connection.close();
    app.close();
});