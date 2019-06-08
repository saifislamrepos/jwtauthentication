const express = require('express');
const mongoose = require('mongoose');
const webpack = require('webpack');
const config = require('../config/webpack.dev.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackhotmodulereplacement = require("webpack-hot-middleware");
const bodyParser = require('body-parser');
const app = express();
const router = require('../routers');
const cookieParser = require('cookie-parser');
config.output.publicPath = '/';
var compiler = webpack(config);
var devmiddleware = webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath,
	watchOptions: {
		aggregateTimeout: 200,
		poll: 1000
	}
});
app.disable('x-powered-by');
app.use(cookieParser());
var hotreload = webpackhotmodulereplacement(compiler);
app.use('/', devmiddleware);
app.use('/', hotreload);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
mongoose.connect('mongodb://localhost/userdata', {
	useNewUrlParser: true,
	useFindAndModify:false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('db connected');
});
app.listen(3000, function () {
	console.log('app listening on port 3000!\n');
	console.log(process.env.environment);
});