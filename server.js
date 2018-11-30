const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost/url-short';
const bodyParser = require('body-parser');
const validUrl = require('valid-url');
//const UrlShorten = mongoose.model('UrlShorten');
const shortid = require('shortid');
const errorUrl = 'http://localhost/error';
const cors = require('cors');

require('./models/UrlShorten');

const app = express();

const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURL, { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/new/:code(*)', (req, res) => {
	let urlCode = req.params.code;
	urlCode = shortid.generate();
	return res.json({ urlCode });
});

//POST API for creating short url from Original URL
app.post('/api/shorturl/new/', async (req, res) => {
	const { originalUrl, shortBaseUrl } = req.body;
	//if (validUrl.isUri(shortBaseUrl)) {
	//} else {
	//	return res.status(401).json('Invalid Base Url');
	//}

	const urlCode = shortid.generate();
	if (validUrl.isUri(originalUrl)) {
		try {
			let item = await UrlShorten.findOne({ originalUrl: originalUrl });
			if (item) {
				res.status(200).json(item);
			} else {
				shortUrl = shortBaseUrl + '/' + urlCode;
				let item = new UrlShorten({
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

app.listen(port, function() {
	console.log('Node.js is listening on port ' + port);
});

module.exports = app;
