var mongoose = require('mongoose');
var validUrl = require('valid-url');
var UrlShorten = mongoose.model('UrlShorten');
var shortid = require('shortid');
var errorUrl = 'http://localhost/error';
module.exports = (app) => {
	//GET API for redirecting to Orignial URL
	app.get('/api/item/:code', async (req, res) => {
		var urlCode = req.params.code;
		var item = await UrlShorten.findOne({ urlCode: urlCode });
		if (item) {
			return res.redirect(item.originalUrl);
		} else {
			return res.redirect(errorUrl);
		}
	});
	//POST API for creating short url from Original URL
	app.post('/api/item', async (req, res) => {
		var { originalUrl, shortBaseUrl } = req.body;
		if (validUrl.isUri(originalUrl)) {
			try {
				const item = await UrlShorten.findOne({ originalUrl: originalUrl });
				if (item) {
					res.status(200).json(item);
				} else {
					shortUrl = shortBaseUrl + '/' + urlCode;
					var item = new UrlShorten({
						originalUrl,
						shortUrl,
						urlCode,
						updatedAt
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
};
