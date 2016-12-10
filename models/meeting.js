var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var meetingSchema = new Schema({

name: {type: String, required: true},
date: {type: String, require: true},
location: {type: String, require: true},
// image: {type: String},
attendants: []

});


var Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
