module.exports.home = function(req,res)
{
    return res.render('home',{ title:'Home', customCss: '/css/home.css', user: req.session.user ? req.session.user.username : null });
}