var express = require('express');
var app = express();
var cheerio = require('cheerio');
var request = require('request');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var articleTitle = require('../models/ArticleTitle.js');
var bodyParser = require('body-parser');
var notes = require('../models/Notes.js');


app.get('/scrape', function(req, res) {
    request('https://www.youtube.com/feed/trending', function(error, response, html) {
        var $ = cheerio.load(html);
        $('.feed-item-container .yt-lockup-content').each(function(i, element) {
            var result = {};
            result.title = $(this).find('a').attr('title');
            result.link = $(this).find('a').attr('href').replace('watch?v=', '');
            var entry = new articleTitle(result);
            entry.save(function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(doc);
                }

            });
        });
        res.send("Scrape Complete");
    });
});



app.get('/', function(req, res) {
    articleTitle.find({}, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
            res.render('index', { title: doc });
        }
    });
});

app.get('/api/:idVideo?', function(req, res) {
    var id = req.params.idVideo;
    articleTitle.findOne({ '_id': id }).populate('note').exec(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.json(doc);
        }
    });

})


app.post('/notes/:idVideo?', function(req, res) {
    var newNote = new notes(req.body);
    newNote.save(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            articleTitle.findOneAndUpdate({ '_id': req.params.idVideo }, { 'note': doc._id })
                .exec(function(err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(doc);
                    }
                });
        }
    });
});



app.get('/notesFinder/:idVideoGlobal?', function(req, res) {
    var id =req.params.idVideoGlobal;
    console.log(id);
    notes.find({ 'idVideoGlobal': id }, function(err, doc) {
        console.log(doc)
       res.json(doc);
    })
});



module.exports = app;
