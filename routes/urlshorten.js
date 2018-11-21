var mongoose = require('mongoose');
var UrlShorten = mongoose.model('UrlShorten');

module.exports = (app) => {
	//GET API for redirecting to Orignial URL
	app.get('/api/item/:code', async (req, res) => {
		var urlCode = req.params.code;
	});
};
