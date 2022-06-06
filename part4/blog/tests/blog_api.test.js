const mongoose = require("mongoose");
const Blog = require("../models/blog");
const supertest = require("supertest");

const app = require("../index");

const api = supertest(app);

test("correct amount of blogs is returned", async () => {
    const response = await api.get("/api/blogs");
    const numberOfBlogs = (await Blog.find({})).length;
    
    expect(response.body).toHaveLength(numberOfBlogs);
}, 100000);

test("post request makes a blog", async () => {
    const blog = new Blog({
        title:"Bukača",
        author:"Rojs",
        url:"test",
        likes:72
    });

    const response = await api.get("/api/blogs");
    const initialLength = response.body.length;

    await blog.save();

    const secondResponse = await api.get("/api/blogs");
    const afterLength = secondResponse.body.length;

    //Placed await here because the program does a forced exit and interrupts this function
    await Blog.deleteOne({url: "test"});
 
    expect(initialLength < afterLength).toBe(true);
});

afterAll(() => mongoose.connection.close());