var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");

// var request = require("request");
var axios = require("axios");
var cheerio = require("cheerio");

var Articles = require("./models/Articles.js");
var Comment = require("./models/Comment.js");

var PORT = process.env.PORT || 3000;

var app = express();
app.use(logger("dev"));
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/wsjDB");

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/html_controllers.js");
app.use(routes);

// Database configuration
// var databaseUrl = "wsjDB";
// var collections = ["articles"];

// var db = mongojs(databaseUrl, collections);
// db.on("Error", function (error) {
//     console.log("Database error: ", error);
// });

Articles.create({ title: "Test Title" })
    .then(function(dbArticles) {
        console.log(dbArticles)
    })
    .catch(function(err) {
        console.log(err.message);
    });

app.get("/all", function (req, res) {
    Articles.find({})
    .then(function(dbArticles) {
        res.json(dbArticles);
    })
    .catch(function(err) {
        res.json(err);
    });
});

app.get("/scrape", function (req, res) {
    axios.get("https://www.wsj.com/").then(function (response) {
        var $ = cheerio.load(response.data);

        $("a.wsj-headline-link").each(function (i, element) {
            var result = {};
            result.title = $(this)
            .children("a")
            .text();

            result.link = $(this)
            .children("a")
            .attr("href");

            $("span.data-reactid").each(function (i, element) {

                result.teaser = $(this)
                .text();

                    Articles.create(result)
                    .then(function(dbArticles) {
                        console.log(dbArticles);
                    }).catch(function(err) {
                        return res.json(err)
                    });
                });
            })
            res.send("Scrape Complete");
        });
    });

app.post("/articles/:id", function (req, res) {
    Articles.findByIdAndUpdate({_id: req.params.id}, {$set: {comment:req.body.comment}}, {new: true}, function(err, comment) {
        if (err) return handleError (err);
        res.send(comment);
    });
});

app.get("/articles/:id", function (req, res) {
    Articles.findByIdAndDelete({_id: req.params.id}, {$unset: {comment: req.body.comment}}, function(err, comment) {
        if(err) return handleError (err);
        res.send(comment)
    })
})

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});
