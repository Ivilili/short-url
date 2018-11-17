var express = require('express');
var mongo = require('mongodb');
var mogoose = require('mongoose');

var cors = require('cors');

var app = express();

var port = process.env.PORT || 3000;

app.use(cors());

app.listen(port, function() {
	console.log('Node.js is listening on port ' + port);
});

module.exports = app;
