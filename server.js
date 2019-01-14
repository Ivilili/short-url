const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost/url-short';
const validUrl = require('valid-url');
const shortid = require('shortid');
const errorUrl = 'http://localhost/error';
const cors = require('cors');

require('./models/UrlShorten');

const app = express();

const port = 3000;

mongoose.connect(mongoURL, { useNewUrlParser: true });

app.use(cors());
//logger
app.use('/', (req, res, next) => {
	console.log(`${req.method}, ${req.path} - ${req.ip}`);
	next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

app.get('api/item/:url(*)', async (req, res) => {
	const urlCode = req.params.url;
	//return res.json({ urlCode });
	const item = await UrlShorten.findOne({ urlCode: urlCode });
	console.log(urlCode);
	if (item) {
		return res.redirect(item.originalUrl);
	} else {
		return res.redirect(errorUrl);
	}
});

app.post('/api/item', async (req, res) => {
	const { originalUrl, shortBaseUrl } = req.body;
	if (validUrl.isUri(shortBaseUrl)) {
	} else {
		return res.status(401).json('Invalid Base Url');
	}

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
