const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createUploadDir = (dir) => {
    if (!fs.existsSync(dir)) {
        try {
            fs.mkdirSync(dir, { recursive: true });
        } catch (err) {
            console.error('Erreur lors de la création du dossier :', err);
        }
    }
};

const storage = (uploadDir) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const uploadImage = (folder) => {
    const uploadDir = path.join(process.cwd(), `src/assets/img/${folder}`);
    createUploadDir(uploadDir);

    const upload = multer({ storage: storage(uploadDir) });

    return (req, res, next) => {
        upload.single('image')(req, res, (err) => {
            if (err) {
                console.error('Erreur Multer :', err.message);
                return res.status(500).json({ error: err.message });
            }
            if (!req.file) {
                return res.status(400).json({ error: "Aucun fichier reçu" });
            }
            next();
        });
    };
};

module.exports = uploadImage;