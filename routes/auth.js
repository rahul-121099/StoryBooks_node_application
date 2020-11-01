const express = require('express');
const router = express.Router();
const passport = require('passport');

//Auth with google METHOD = GET url = /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile']}))

//Google auth callback url route METHOD = GET url = /auth/google/callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
    res.redirect('/dashboard');
});

module.exports = router;