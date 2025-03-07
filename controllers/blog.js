const Blog = require("../models/blog");

async function handleBlogRoute(req, res) {
    res.render('addblog', {
        user: req.user
    });
}

async function handleBlogById(req, res) {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    console.log("blog", blog);
    const comments = await Comment.findById({ blogId: req.params.id }).populate("createdBy");
    console.log(" comments", comments);
    return res.render("blog", {
        user: req.user,
        blog,
        comments
    })
};

module.exports = {
    handleBlogRoute,
    handleBlogById
};