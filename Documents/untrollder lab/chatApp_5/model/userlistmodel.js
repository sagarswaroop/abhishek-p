const mongoose = require('./db/connection');

var Scheema = mongoose.Schema;

let userListSchema = new Scheema({
    email: {
        type: String,
        require: true,
    },
    userlist: [{
        name: String,
        email: String
    }]
});

let usersList = mongoose.model('usersList', userListSchema);
module.exports = usersList;