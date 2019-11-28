const mongoose = require('./connection');

var Scheema = mongoose.Schema;

let chatSchema = new Scheema({
    "username": { type: String },
    "chat": { type: String },
    "details": {}
});

let chatcollection = mongoose.model('usersChat', chatSchema);
module.exports = chatcollection;