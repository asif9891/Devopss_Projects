module.exports.dashboard = (req, res) => {
    console.log(req.session);
    return res.render('dasboard.ejs',{title: this.dashboard ,user: req.session.user.username});
}
