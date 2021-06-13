exports.get404 = (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page not found', 
        path: '/404',
        isAuthenticated: req.session.isLoggedIn //Does this need to be here for the error page?
    });
};

exports.get500 = (req, res, next) => {
    console.log('Controller error');
    res.status(500).render('500', {
        pageTitle: 'Error!',
        path: '/500',
        isAuthenticated: req.session.isLoggedIn
    });
};