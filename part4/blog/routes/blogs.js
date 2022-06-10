const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

blogsRouter.get("/", async (req, res) => {
    const blogs = await Blog
        .find({})
        .populate("user");

    return res.send(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
    const blog = await Blog
        .findById(req.params.id)
        .populate("user");

    return res.status(200).json(blog);
});

blogsRouter.post("/", async (req, res) => {
    const blog = new Blog(req.body);
    const jwtToken = req.token;

    if (!jwtToken) {
        return res.status(401).json({ error: "token for this action is required!" });
    }
    const authorized = jwt.verify(jwtToken, process.env.SECRET);
    if (!authorized) {
        return res.status(401).json({ error: "token expired or incorrect" });
    }
    const user = await User.findById(authorized.id);
    if (!user) {
        return res.status(401).json({ error: "user has been deleted" });
    }

    blog.user = user.id;

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog.id);

    await user.save();

    return res.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (req, res) => {
    const newBlog = req.body;
    const result = await Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true })
        .populate("user");
    res.status(200).json(result);
});

blogsRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const jwtToken = req.token;

    if (!jwtToken) {
        return res.status(401).json({ error: "token for this action is required!" });
    }
    const authorized = jwt.verify(jwtToken, process.env.SECRET);
    if (!authorized) {
        return res.status(401).json({ error: "token expired or incorrect" });
    }
    const user = await User.findById(authorized.id);
    if (!user) {
        return res.status(401).json({ error: "user has been deleted" });
    }

    const blog = await Blog.findById(id);

    if (blog.user.toString() != authorized.id) {
        return res.status(401).send({ error: "can't delete blogs made by other users" });
    }

    await Blog.findByIdAndRemove(id);
    user.blogs = user.blogs.filter(b => b != id);
    await user.save();

    return res.sendStatus(204);
});

module.exports = blogsRouter;