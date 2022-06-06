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
 
    expect(initialLength < afterLength).toBe(true);
});

test("put request updates a blog", async () => {
    const blog = await Blog.findOne({url:"test"});
    const blogId = blog.id;

    console.log("HELLO", blog);

    blog.likes = 1337;

    console.log("UPDATED", blog);

    console.log(blogId);

    const updatedBlog = await api.put(`/api/blogs/${blogId}`, blog);

    expect(updatedBlog.body.likes).toBe(blog.likes);
});

test("delete request deletes a blog", async () => {
    const blog = await Blog.findOne({url:"test"});
    await api.del(`/api/blogs/${blog.id}`);
    const noBlog = await Blog.findOne({url:"test"});
    expect(noBlog).toBe(null);
});

afterAll(() => mongoose.connection.close());