const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlShortSchema = new Schema(
	{
		originalUrl: String,
		urlCode: String,
		shortUrl: String
	},
	{ timestamps: true }
);

module.exports = mongoose.model('UrlShorten', urlShortSchema);
