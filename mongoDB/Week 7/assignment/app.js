var mongoose = require('mongoose');
var express = require('express');
var models = require('./models');
var routes = require('./routes');
var middleware = require('./middleware');
require('express-mongoose');
//console.log(mongoose.version);
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost', function (err) {
  if (err) throw err;
	console.log('connected!');

	var app = express();
  middleware(app);
	routes(app);
	/*app.get('/', function (req, res){ //route
		res.send(200, 'hello mongoose blog');
	})*/
	//mongoose.disconnect();
	app.listen(3000, function () {
		console.log('Now listening to http://localhost:3000')
	})
})
