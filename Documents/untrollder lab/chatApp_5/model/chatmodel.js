const mongoose = require('./db/connection');

var Scheema = mongoose.Schema;

let chatSchema = new Scheema({
    id: {
        type: String,
        require: true
    },
    chatid: {
        type: String,
        require: true
    },
    chathistory: [{
        senderEmail: String,
        reciverEmail: String,
        message: String,
        msgtype: String,
        time: String,
        date: String,
        day: String
    }]
});

let chatcollection = mongoose.model('historyofChats', chatSchema);
module.exports = chatcollection;