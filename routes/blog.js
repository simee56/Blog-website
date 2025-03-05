const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const Blog = require('../models/blog');

const { handleBlogRoute,handleBlogById } = require('../controllers/blog');

router.get('/addnewblog', handleBlogRoute);
router.get(':/id', handleBlogById);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./public/uploads/"));
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    },
});
const upload = multer({ storage: storage })
router.post('/', upload.single("coverImage"), async (req, res) => {
        const { title, bodyContent } = req.body;

        if (!title || !bodyContent) {
            return res.status(400).send("Title and content are required");
        }
        if (!req.file) {
            return res.status(400).send("Cover image is required");
        }
        
        const blog = await Blog.create({
            title,
            bodyContent,
            createdBy: req.user._id,
            coverImage: `/uploads/${req.file.filename}`
        });
        return res.redirect(`/blog/${blog._id}`);

    })
module.exports = router;