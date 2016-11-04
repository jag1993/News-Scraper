var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var request = require('request'); 
var cheerio = require('cheerio');
var exphbs = require('express-handlebars');




app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/news-scraper');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function() {
  console.log('Mongoose connection successful.');
});



var routes = require('./controllers/notes-scraper-controller.js')
app.use('/', routes);
















app.listen(7015, function() {
  console.log('App running on port 7015!');
});
