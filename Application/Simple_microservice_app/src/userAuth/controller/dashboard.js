module.exports.dashboard = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    return res.render('dasboard.ejs', {
        title: 'Userprofile',
        user: req.session.user.username,
        cateogry: req.session.user.cateogry,
        sessionExpires: new Date(Date.now() + req.session.cookie.maxAge).toLocaleTimeString()
    });
};