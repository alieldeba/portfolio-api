const { check, body } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");

exports.getProjectValidator = [
  check("id").isMongoId().withMessage("Invalid ID"),
  validatorMiddleware,
];

exports.createProjectValidator = [
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("name is too short")
    .isLength({ max: 32 })
    .withMessage("name is too long"),

  check("desc")
    .notEmpty()
    .withMessage("description is required")
    .isLength({ min: 3 })
    .withMessage("description is too short")
    .isLength({ max: 100 })
    .withMessage("description is too long"),

  check("previewLink").notEmpty().withMessage("preview link is required"),

  check("sourceLink").optional(),

  check("image").optional(),
  
  validatorMiddleware,
];

exports.updateProjectValidator = [
  check("id").isMongoId().withMessage("Invalid ID"),
  body("name").optional(),
  validatorMiddleware,
];

exports.deleteProjectValidator = [
  check("id").isMongoId().withMessage("Invalid ID"),
  validatorMiddleware,
];
