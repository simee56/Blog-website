const Blog = require("../models/blog");
const Comment = require("../models/comments");

async function handleBlogRoute(req, res) {
    res.render('addblog', {
        user: req.user
    });
}

async function handleBlogById(req, res) {
    const blog = await Blog.findById(req.params.id).populate("createdBy", "fullName profilePicURL");

    const comments =await Comment.find({blogId: req.params.id}).populate("createdBy", "fullName profilePicURL");
    console.log("comments", comments);

    return res.render("blog", {
        user: req.user,
        blog: blog,
        comments:comments,
    })
};

module.exports = {
    handleBlogRoute,
    handleBlogById
};