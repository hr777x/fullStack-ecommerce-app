import multer from 'multer';
import path from 'path';


// Define storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure images are saved in the 'uploads/images/' folder
        cb(null, 'uploads/images/');
    },
    filename: (req, file, cb) => {
        // Create a unique name for each file
        const uniqueName = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

// Export the multer upload middleware
export const upload = multer({
    storage: storage,  // Use the storage configuration
    fileFilter: (req, file, cb) => {
        // Define allowed file types
        const fileTypes = /jpeg|jpg|png/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extName && mimeType) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    },
    limits: { fileSize: 1024 * 1024 * 5 },  // Limit file size to 5MB
});
