const dbpath = require('../../config');
const mongoose = require('mongoose');
mongoose.connect(dbpath.dbAddress, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
module.exports = mongoose;