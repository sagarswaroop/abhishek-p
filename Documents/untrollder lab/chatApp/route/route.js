const rout = require('express').Router();
const multer = require('multer');
const path = require('path');

var newPath = path.join(path.normalize(__dirname + "\\.."), "/data");
console.log("new path is " + newPath);

const upload = multer({
    dest: "/uplaod"
}).fields({ name: 'file' });

// rout.get('/chat', upload.single('files'), (req, res) => {
rout.get('/chat', (req, res) => {
    var files = req.files;
    // console.log(files);
    console.log("rout call...", files);
    res.send("form method get succesfully");

    console.log("file data is", req.query);
    // console.log("object of file is", object);
});

module.exports = rout;