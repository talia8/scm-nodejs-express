const express = require('express');
const router = express.Router();

/* 
route for main page
*/
router.get('/index', (req, res) => {
        res.render('index');
    });

module.exports =  router;
