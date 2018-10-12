var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticlesSchema = new Schema ({
    title: {
        type: String, 
        unique: true,
        required: true
    }, 
    teaser: {
        type: String,
    }, 
    link: {
        type: String, 
    }, 
    comment: {
        type: Schema.Types.ObjectId, 
        ref: "Comment"
    }
});

var Articles = mongoose.model("Articles", ArticlesSchema);

module.exports = Articles;