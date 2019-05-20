const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('This is a dashboard');
});

module.exports = router;