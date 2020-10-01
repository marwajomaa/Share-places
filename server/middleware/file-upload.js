const multer = require("multer");
const uuid = require("uuid/v1");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limit: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, ccb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid(), "." + ext);
    },
  }),
});

module.exports = fileUpload;
