const multer = require("multer");
const ApiError = require("../utils/apiError");

const multerConfig = () => {
  const storage = multer.memoryStorage();

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Only images allowed", 400), false);
    }
  };

  const upload = multer({ storage: storage, fileFilter: fileFilter });

  return upload;
};

exports.uploadSingleImage = (fieldName) => multerConfig().single(fieldName);

exports.uploadImages = (fields) => multerConfig().fields(fields);