var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var memberSchema = new Schema({

name: {type: String, required: true},
description: {type: String, require: true},
email: {type: String, require: true},
phone: {type: String, require: true},
image: {type: String},
events: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }] //hold all events and event info
// events: [{ type: String, ref: 'Meeting' }]  //to hold specific event name
});


var Member = mongoose.model('Member', memberSchema);

module.exports = Member;
