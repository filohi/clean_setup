const express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req,res) => {
    res.render('index')
})

router.get('/admin', (req,res) => {
    res.render('login')
})

router.post('/admin', 
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/admin' }),
    function(req, res) {
});

module.exports = router