const Blog = require("../models/blog");

async function handleBlogRoute(req, res) {
    res.render('addblog', {
        user: req.user
    });
}

async function handleBlogById(req, res) {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    console.log("blog", blog);
    return res.render("blog", {
        user: req.user,
        blog: blog,
    })
};

module.exports = {
    handleBlogRoute,
    handleBlogById
};