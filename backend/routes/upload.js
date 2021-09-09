const router = require('express').Router();
const multer = require('multer');

// config for uploading file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/posts');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name); // req.body.name file.originalname
  }
});

// allow only image files to be uploaded
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(null, false);
  }
  cb(null, true);
};

// limits for multer/busboy
const limits = {
  fields: 1,
  fileSize: 3000000, // 3MB
  files: 1
};

// upload file
const upload = multer({ storage, fileFilter, limits });
// request handler
router.post('/', upload.single('file'), (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  }

  try {
    return res.status(200).json('File uploaded successfully.');
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
