const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (req, res) => {
    Blog
        .find({})
        .populate("user")
        .then(blogs => {
            res.json(blogs);
        });
});

blogsRouter.get("/:id", (req, res) => {
    Blog
        .findById(req.params.id)
        .populate("user")
        .then(blog => {
            res.json(blog);
        });
});

blogsRouter.post("/", (req, res) => {
    const blog = new Blog(req.body);

    blog
        .save()
        .then((blog) => {
            res.status(201).json(blog);
        });
});

blogsRouter.put("/:id", (req, res) => {
    const newBlog = req.body;
    Blog.findByIdAndUpdate(req.params.id, newBlog, {new: true})
        .populate("user")
        .then((result) => {
            res.status(200).json(result);
        });
});

blogsRouter.delete("/:id", (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndRemove(id)
        .then(() => {
            res.sendStatus(204);
        });
});

module.exports = blogsRouter;