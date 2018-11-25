const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost/url-shortener';
const connectOptions = {
	keepAlive: true,
	reconnectTries: Number.MAX_VALUE
};
const bodyParser = require('body-parser');
const validUrl = require('valid-url');
const UrlShorten = mongoose.model('UrlShorten');
const shortid = require('shortid');
const errorUrl = 'http://localhost/error';
const cors = require('cors');

require('./models/UrlShorten');

const app = express();

const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURL, connectOptions, (err, db) => {
	if (err) console.log('Error', err);
	console.log('Connected to MongoDB');
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/item/:code', async (req, res) => {
	const urlCode = req.params.code;
	const item = await UrlShorten.findOne({ urlCode: urlCode });
	if (item) {
		return res.redirect(item.originalUrl);
	} else {
		return res.redirect(errorUrl);
	}
});

//POST API for creating short url from Original URL
app.post('/api/item', async (req, res) => {
	const { originalUrl, shortBaseUrl } = req.body;
	if (validUrl.isUri(shortBaseUrl)) {
	} else {
		return res.status(401).json('Invalid Base Url');
	}

	const urlCode = shortid.generate();
	if (validUrl.isUri(originalUrl)) {
		try {
			const item = await UrlShorten.findOne({ originalUrl: originalUrl });
			if (item) {
				res.status(200).json(item);
			} else {
				shortUrl = shortBaseUrl + '/' + urlCode;
				const item = new UrlShorten({
					originalUrl,
					shortUrl,
					urlCode
				});
				await item.save();
				res.status(200).json(item);
			}
		} catch (err) {
			res.status(401).json('Invalid User Id');
		}
	} else {
		return res.status(401).json('Invalid Original Url');
	}
});

// first API endpoint...
app.get('/api/hello', function(req, res) {
	res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
	console.log('Node.js is listening on port ' + port);
});

module.exports = app;
