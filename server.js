var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(express.static("public"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/html_controllers.js");
app.use(routes);

// Database configuration
var databaseUrl = "theCut_db"
var collections = ["articles"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl, collections);
db.on("Error", function (error){
    console.log("Database error: ", error);
});

app.get("/all", function (req, res) {
    db.articles.find({}, function (err, data) {
        if (err) {
            console.log(err);
            return false;
        }
        res.json(data);
    });
});

app.get("/articles", function (req, res) {
    request("https://www.thecut.com/power/", function (error, response, html) {

        var $ = cheerio.load(html);

        var results = [];

        $("a.article").each(function(i, element) {
            var link = $(element).attr("href");
            var title = $(element).children().text();

            db.articles.insert({
                title: title, 
                link: link
            });
            results.push({
                title: title, 
                link: link
            });
        });
    });
    // console.log("+++++++++++++++++++++++++++");
    // console.log();
    // console.log(results);
    // console.log();
    // console.log("+++++++++++++++++++++++++++");
});

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
  