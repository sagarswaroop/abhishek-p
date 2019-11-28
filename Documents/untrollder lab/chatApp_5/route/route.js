const rout = require('express').Router();
const multer = require('multer');
const path = require('path');
const userOperation = require('../helper/useropreation');


var Storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
        //cb always first paramter is null second filename with fieldname mention in your form name="".
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({
    storage: Storage
}).single('file');

rout.post('/search', (req, res) => {
    let serachUser = req.body;
    // console.log("search user object is", serachUser);
    userOperation.search(serachUser, res);

});

rout.post('/upload', upload, (req, res) => {
    let obj = req.body;
    let suceess = req.file;
    res.json(suceess);
    console.log("file data is", suceess);
    console.log("reqest body is ", obj);
    // let success = req.file.fieldname + "upload successfully";
});

module.exports = rout;