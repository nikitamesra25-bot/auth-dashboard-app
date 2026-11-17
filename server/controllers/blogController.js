const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const blog = await Blog.create({
            title,
            content,
            author: req.user._id
        });

        res.status(201).json({
            message: "Blog created successfully",
            blog
        });

    } catch (error) {
        res.status(500).json({
            message: "Blog creation failed",
            error: error.message
        });
    }
};

const getMyBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({
            author: req.user._id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Your blogs fetched successfully",
            totalBlogs: blogs.length,
            blogs
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch blogs",
            error: error.message
        });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

        const blog = await Blog.findOne({
            _id: req.params.id,
            author: req.user._id
        });

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found or unauthorized"
            });
        }

        if (title !== undefined) {
            blog.title = title;
        }

        if (content !== undefined) {
            blog.content = content;
        }

        await blog.save();

        res.status(200).json({
            message: "Blog updated successfully",
            blog
        });

    } catch (error) {
        res.status(500).json({
            message: "Blog update failed",
            error: error.message
        });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne({
            _id: req.params.id,
            author: req.user._id
        });

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found or unauthorized"
            });
        }

        await Blog.findByIdAndDelete(blog._id);

        res.status(200).json({
            message: "Blog deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Blog deletion failed",
            error: error.message
        });
    }
};

module.exports = { createBlog, getMyBlogs, updateBlog, deleteBlog};