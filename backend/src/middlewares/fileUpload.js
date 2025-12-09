const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

// Ensure directories exist
const tempDir = path.join(__dirname, '../uploads/temp');
const finalDir = path.join(__dirname, '../uploads/images');

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
if (!fs.existsSync(finalDir)) fs.mkdirSync(finalDir, { recursive: true });

// Multer storage (Temp)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        cb(null, `raw-${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Image Processing Middleware
const processImage = async (req, res, next) => {
    if (!req.file) return next();

    try {
        const filename = `processed-${Date.now()}.jpg`;
        const outputPath = path.join(finalDir, filename);

        await sharp(req.file.path)
            .resize(450, 350, { fit: 'cover' })
            .toFile(outputPath);

        // Delete original
        fs.unlinkSync(req.file.path);

        // Attach public URL to req
        req.body.image = `${req.protocol}://${req.get('host')}/uploads/images/${filename}`;
        next();
    } catch (error) {
        console.error('Image processing error:', error);
        return res.status(500).json({ message: 'Image processing failed' });
    }
};

module.exports = { upload, processImage };
