var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NotesSchema = new Schema({
	title:{
		type:String
	},
	body:{
		type:String
	},
	idVideoGlobal:{
		type:String
	}
});


var Notes = mongoose.model('Notes',NotesSchema);

module.exports = Notes;