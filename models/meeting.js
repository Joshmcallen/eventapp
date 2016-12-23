var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var meetingSchema = new Schema({

name: {type: String, required: true},
date: {type: String, require: true},
location: {type: String, require: true},
description: {type: String},
image: {type: String},
attendants: [{ type: Schema.Types.ObjectId, ref: 'Member'}] //to hold all attendant info
// attendants: [{ type: String, ref: 'Member' }] //to hold info attendant name
});


var Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
