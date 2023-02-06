// Freya Avalon Orla Mann -- Middleware for the authentication of users

let authentication = (req, res, next) => {
    if (req.session && req.session.login){
        return next();
    } else{
        res.render('auth_login');
    }
}

module.exports = authentication;