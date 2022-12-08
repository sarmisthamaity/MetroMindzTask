const multer = require('multer');
const path = require('path');

// const fileStorageEngine = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "images");
//     },
//     filename: (req, file, callback) => {
//         callback(null, Date.now() + "___" + file.originalname);
//     }
// });

// const upload = multer({
//     storage: fileStorageEngine
// });

const storage = multer.diskStorage({
    // Destination to store image
    destination: 'uploads/images',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
      // file.fieldname is name of the field (image)
      // path.extname get the uploaded file extension
    },
});
  
const upload = multer({
storage: storage,
limits: {
    fileSize: 5000000, // 5 * 1000000 Bytes = 5 MB
},
fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|pdf|jpg|jpeg)$/)) {
    // upload only png and jpg format
    return cb(new Error('Please upload only png and jpg file'));
    }
    cb(undefined, true);
},
});

module.exports = upload;