const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const SkillModel = require("../models/skillModel");
const { uploadSingleImage } = require("../middlewares/imageUploadMiddleware");

const factory = require("./handlersFactory");

exports.uploadSkillImage = uploadSingleImage("image");

exports.resizeSkillImage = async (req, res, next) => {
  if (req.file) {
    const filename = `skill-${uuidv4()}-${Date.now()}.png`;
    await sharp(req.file.buffer)
      .resize(1000, 1000)
      .toFormat("png")
      .png({ quality: 99 })
      .toFile(`assets/uploads/skills/${filename}`);

    req.body.image = filename;
  }

  next();
};

// @desc    Gets all skills
// @route   GET /api/v1/skills
// @returns List of skills
// @access  Public
exports.getSkills = factory.getAll(SkillModel);

// @desc    Gets specific skill
// @route   GET /api/v1/skills/:id
// @returns Specific skill
// @access  Public
exports.getSkill = factory.getOne(SkillModel);

// @desc    Creates new skill
// @route   POST /api/v1/skills
// @returns Void
// @access  Private
exports.createSkill = factory.createOne(SkillModel);

// @desc    Update specific skill
// @route   GET /api/v1/Skills/:id
// @returns Void
// @access  Private
exports.updateSkill = factory.updateOne(SkillModel);

// @desc    Delete specific skill
// @route   DELETE /api/v1/skills/:id
// @returns Void
// @access  Private
exports.deleteSkill = factory.deleteOne(SkillModel);
