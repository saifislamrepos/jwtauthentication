const express = require('express');
const router = express.Router();
const path = require('path');
const controllers = require('../config/controller');
router.use('/verify',controllers.verify);
router.post('/signIn',controllers.signin);
router.post('/createadmin',controllers.createadmin);
router.use(function (err, req, res, next) {
	if (!err.statusCode) err.statusCode = 500; 
	res.status(err.statusCode).send(err.message);
});
module.exports = router;