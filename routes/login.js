const express = require('express');
const router = express.Router();

const {forwardAuthenticated} = require('../config/auth');

router.get('/', forwardAuthenticated, (req, res) => {
    res.render('login.ejs');
});

module.exports = router;