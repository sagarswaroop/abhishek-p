const mongoose = require('./db/connection');
var Scheema = mongoose.Schema;

let userSchema = new Scheema({
    "name": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "status": {
        type: String,
        required: true,
        default: "offline"
    },
    "address": {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }

});

let userStatus = mongoose.model('onlineusers', userSchema);
module.exports = userStatus;