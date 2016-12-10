var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({

name: {type: String, required: true},
description: {type: String, require: true},
email: {type: String, require: true},
phone: {type: String, require: true},
image: {type: String},
meeting: []

});


var Member = mongoose.model('Member', memberSchema);

module.exports = Member;
