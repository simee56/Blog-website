async function handleBlogRoute(req,res) {
    res.render('addblog', {
        user :req.user
    });
}


module.exports =  {
    handleBlogRoute
};