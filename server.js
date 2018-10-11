
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var mongojs = require("mongojs")
var logger = require("morgan");

var request = require("request");
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

Articles.create({ title: "Test Title" })
    .then(function (dbArticles) {
        console.log(dbArticles)
    })
    .catch(function (err) {
        console.log(err.message);
    });

app.get("/all", function (req, res) {
    Articles.find({})
        .then(function (dbArticles) {
            res.json(dbArticles);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.get("/scrape", function (req, res) {
    axios.get("https://www.wsj.com/").then(function (response) {
        var $ = cheerio.load(response.data);
        // var results = [];
    
        $("a.wsj-headline-link").each(function (i, element) {
            var title = $(element).text();
            var link = $(element).attr("href");
            // results.push({ title: title, link: link })
    
            $("p.wsj-summary.dj-sg.wsj-card-feature").each(function (i, element) {
                var teaser = $(element).children().text();

                if (title && link && teaser) {
                    Articles.insert({
                        title: title, 
                        teaser: teaser, 
                        link: link
                    }, function (err, inserted) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(inserted);
                        }
                    })
                }
                // results.push({ title: title, teaser: teaser, link: link })
            })
        })
        // console.log(results);
    });
    res.send("Scrape Complete")
})



app.post("/articles/:id", function (req, res) {
    Articles.findByIdAndUpdate({ _id: req.params.id }, { $set: { comment: req.body.comment } }, { new: true }, function (err, comment) {
        if (err) return handleError(err);
        res.send(comment);
    });
});

app.get("/articles/:id", function (req, res) {
    Articles.findByIdAndDelete({ _id: req.params.id }, { $unset: { comment: req.body.comment } }, function (err, comment) {
        if (err) return handleError(err);
        res.send(comment)
    })
})

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});
