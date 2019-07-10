const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect to database
connectDB();

app.use(express.json());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

//Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

//logger
app.use('/', (req, res, next) => {
	console.log(`${req.method}, ${req.path} - ${req.ip}`);
	next();
});

//app.get('api/item/:url(*)', async (req, res) => {
//	const urlCode = req.params.url;
//	return res.json({ urlCode });
//	const item = await UrlShorten.findOne({ urlCode: urlCode });
//	if (item) {
//		return res.redirect(item.originalUrl);
//	} else {
//		return res.redirect(errorUrl);
//	}
//});
const port = 5000;

app.listen(port, function() {
	console.log('Node.js is listening on port ' + port);
});

module.exports = app;
