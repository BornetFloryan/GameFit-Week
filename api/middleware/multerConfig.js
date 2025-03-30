const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../src/assets/goodies'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const uploadImage = (uploadPath) => {
    return (req, res, next) => {
        req.uploadPath = uploadPath;
        upload.single('image')(req, res, next);
    };
};

module.exports = uploadImage;