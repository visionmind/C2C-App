const path = require('path');
const multer = require('multer');

module.exports = folderName => multer({
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (
      ext !== '.png'
        && ext !== '.jpg'
        && ext !== '.gif'
        && ext !== '.jpeg'
    ) {
      cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  },
  dest: `public/uploads/${folderName}/`,
});
