var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
    title: {
        type: String, 
        unique: true,
        required: true
    }, 
    teaser: {
        type: String, 
        unique: true,
    }, 
    link: {
        type: String, 
    }, 
    comment: {
        type: Schema.Types.ObjectId, 
        ref: "Comment"
    }
});

var Articles = mongoose.model("Articles", ArticleSchema);

module.exports = Articles;