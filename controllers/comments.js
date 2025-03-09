const Comment = require("../models/comments");

async function handleComments(req, res) {
    await Comment.create ({
        content :req.body.content,
        blogId : req.params.blogId,
        createdBy :req.user._id
    });
    return res.redirect(`/blog/${req.params.blogId}`);
}

module.exports = handleComments;