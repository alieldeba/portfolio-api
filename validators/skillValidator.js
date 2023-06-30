const { check, body } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");

exports.getSkillValidator = [
  check("id").isMongoId().withMessage("Invalid ID"),
  validatorMiddleware,
];

exports.createSkillValidator = [
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 1 })
    .withMessage("name is too short")
    .isLength({ max: 32 })
    .withMessage("name is too long"),

  check("image").notEmpty().withMessage("image is required"),

  validatorMiddleware,
];

exports.updateSkillValidator = [
  check("id").isMongoId().withMessage("Invalid ID"),
  body("name").optional(),
  validatorMiddleware,
];

exports.deleteSkillValidator = [
  check("id").isMongoId().withMessage("Invalid ID"),
  validatorMiddleware,
];
