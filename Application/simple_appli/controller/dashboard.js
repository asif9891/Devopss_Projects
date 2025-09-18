module.exports.dashboard = (req, res) => {
    if(!req.session.user){
        return res.redirect('/login');
    }
    return res.render('dasboard.ejs',{title: 'Userprofile' ,user: req.session.user.username});
}
