import multer from 'multer';

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
       return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }

});

export const upload = multer({storage: storage});