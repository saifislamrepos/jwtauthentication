const express = require('express');
const router = express.Router();
const path = require('path');
const controllers = require('../config/controller');
const bodyParser = require('body-parser');
router.use('/verify',bodyParser.json(),controllers.verify);
router.post('/signIn',bodyParser.json(),controllers.signin);
router.post('/createadmin',bodyParser.json(),controllers.createadmin);
router.use(function (err, req, res, next) {
	if (!err.statusCode) err.statusCode = 500; 
	res.status(err.statusCode).send(err.message);
});
module.exports = router;