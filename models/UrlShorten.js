const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//change database...don't need mlab

const urlShortSchema = new Schema(
	{
		originalUrl: String,
		urlCode: String,
		shortUrl: String
	},
	{ timestamps: true }
);

module.exports = mongoose.model('UrlShorten', urlShortSchema);
