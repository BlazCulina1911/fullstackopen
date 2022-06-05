const express = require("express");
const Blog = require("../models/blog");
const router = express.Router();

router.get("/", (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs);
        });
});

router.get("/:id", (req, res) => {
    Blog
        .findById(req.params.id)
        .then(blog => {
            res.json(blog);
        });
});

router.post("/", (req, res) => {
    const blog = new Blog(req.body);

    blog
        .save()
        .then((blog) => {
            res.status(201).json(blog);
        });
});

router.put("/:id", (req, res) => {
    const newBlog = req.body;
    Blog.findByIdAndUpdate(req.params.id, newBlog, {new: true})
        .then((result) => {
            res.status(200).json(result);
        });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndRemove(id)
        .then(() => {
            res.sendStatus(204);
        });
});

module.exports = router;