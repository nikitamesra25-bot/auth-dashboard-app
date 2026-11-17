const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createBlog,
    getMyBlogs,
    updateBlog,
    deleteBlog
} = require("../controllers/blogController");

router.post("/", protect, createBlog);

router.get("/my-blogs", protect, getMyBlogs);

router.put("/:id", protect, updateBlog);

router.delete("/:id", protect, deleteBlog);

module.exports = router;