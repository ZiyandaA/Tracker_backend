function authRequire(req, res, next) {
    if(req.session.user) {
        next();
    }
    else {
        res.status(401).send('you are not logged in!')
    }

}

module.exports = authRequire;