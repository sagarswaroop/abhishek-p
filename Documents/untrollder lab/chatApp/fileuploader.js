const multer = require('multer');

const mimetype = {
    // "image/jpeg":"jpeg",
    "image/jpg": "jpg",
    "image/png": "png",
}

//detination configure
const destination = (req, file, cb) => {
    // const error = new Error('no destination found');
    const path = 'uploads/';
    cb(null, path);
};

//filename Configuare
const filename = (req, file, cb) => {
    if (mimetype[file.mimetype]) {
        const fname = `${file.originalname.split('.')[0]}-${Date.now().toString()}.${file.mimetype.split('/')[1]}`;
        cb(null, fname);
    } else {
        const error = new Error('image type is not valid');
        cb(error);
    }


};

//make storage object
const storage = multer.diskStorage({
    destination: destination,
    filename: filename,
});

module.exports = multer({ storage: storage });