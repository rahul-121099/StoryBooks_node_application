const express = require('express');
const router = express.Router();

//Home or Login route METHOD = GET
router.get('/', (req, res) => {
    res.render('login', {
        layout: 'login'
    });
});

//Dashboard route METHOD = GET
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

//temp route
router.get('/temp', (req, res) => {
    res.send("You reached the callback auth success");
})

module.exports = router;