const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");
const supertest = require("supertest");

const app = require("../index");

const api = supertest(app);


const accountDetails = {
    name: "A P I T E S T E R",
    username: "APItest",
    password: "test"
};

let token;

beforeAll(async () => {
    const registerResponse = await api
        .post("/api/users")
        .send(accountDetails);

    accountDetails.id = registerResponse.body.id;

    const loginResponse = await api
        .post("/api/login")
        .send({
            username: accountDetails.username,
            password: accountDetails.password
        });

    token = "bearer " + loginResponse.body;
});

test("correct amount of blogs is returned", async () => {
    const response = await api.get("/api/blogs");
    const numberOfBlogs = (await Blog.find({})).length;

    expect(response.body).toHaveLength(numberOfBlogs);
}, 100000);

test("post fails without token and returns 401", async () => {
    const blog = {
        title: "Bukača",
        author: "Rojs",
        url: "test",
        likes: 72,
    };

    const response = await api
        .post("/api/blogs")
        .send(blog);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("token for this action is required!");
});

test("post request makes a blog", async () => {
    const blog = {
        title: "Bukača",
        author: "Rojs",
        url: "test",
        likes: 72
    };

    const response = await api.get("/api/blogs");
    const initialLength = response.body.length;

    await api.post("/api/blogs")
        .set({ authorization: token })
        .send(blog);

    const secondResponse = await api.get("/api/blogs");
    const afterLength = secondResponse.body.length;

    expect(initialLength < afterLength).toBe(true);
}, 50000);

test("put request updates a blog", async () => {
    const blog = await Blog.findOne({ url: "test" });
    const blogId = blog.id;

    const newLikes = 1337;

    const updatedBlog = await api.put(`/api/blogs/${blogId}`, { likes: newLikes });

    expect(updatedBlog.body.likes).toBe(blog.likes);
}, 50000);

test("delete request deletes a blog", async () => {
    const blog = await Blog.findOne({ url: "test" });
    await api
        .del(`/api/blogs/${blog.id}`)
        .set({ authorization: token });
    const noBlog = await Blog.findOne({ url: "test" });
    expect(noBlog).toBe(null);
}, 50000);

afterAll(async () => {

    await User.findByIdAndDelete(accountDetails.id);
    mongoose.connection.close();
    app.close();
});