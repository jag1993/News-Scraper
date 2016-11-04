var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleTitleSchema = new Schema({
	title:{
		type:String,
		required:true
	},
	link:{
		type:String,
		required:true
	},
	notes:{
		type: Schema.Types.ObjectId,
		ref: 'Notes'
	}
});

var ArticleTitle = mongoose.model('ArticleTitle', ArticleTitleSchema);

module.exports = ArticleTitle;
