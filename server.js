var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var cors = require('cors');

require('./models/UrlShorten');

var app = express();

var port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin1234@ds039281.mlab.com:39281/ivibear', { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

// first API endpoint...
app.get('/api/hello', function(req, res) {
	res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
	console.log('Node.js is listening on port ' + port);
});

module.exports = app;
