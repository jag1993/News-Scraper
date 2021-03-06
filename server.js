var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var request = require('request'); 
var cheerio = require('cheerio');
var exphbs = require('express-handlebars');

app.set('port', (process.env.PORT || 7015));


app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

mongoose.connect('mongodb://heroku_z3qn5wlt:4eg0e24penfoo80vcv9hln283l@ds143767.mlab.com:43767/heroku_z3qn5wlt');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function() {
  console.log('Mongoose connection successful.');
});



var routes = require('./controllers/notes-scraper-controller.js')
app.use('/', routes);
















app.listen(app.get('port'), function () {
	console.log('App listening on PORT ', app.get('port'));
});
