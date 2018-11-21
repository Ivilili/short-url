var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlShortSchema = new Schema({
	originalUrl: String,
	urlCode: String,
	shortUrl: String,
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UrlShorten', urlShortSchema);