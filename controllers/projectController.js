const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const ProjectModel = require("../models/projectModel");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/imageUploadMiddleware");

exports.uploadProjectImage = uploadSingleImage("image");

exports.resizeProjectImage = async (req, res, next) => {
  if (req.file) {
    const filename = `project-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(1000, 1000)
      .toFormat("jpeg")
      .jpeg({ quality: 99 })
      .toFile(`assets/uploads/projects/${filename}`);

    req.body.image = filename;
  }

  next();
};

// @desc    Gets all projects
// @route   GET /api/v1/projects
// @returns List of projects
// @access  Public
exports.getProjects = factory.getAll(ProjectModel);

// @desc    Gets specific project
// @route   GET /api/v1/projects/:id
// @returns Specific project
// @access  Public
exports.getProject = factory.getOne(ProjectModel);

// @desc    Creates new project
// @route   POST /api/v1/projects
// @returns Void
// @access  Private
exports.createProject = factory.createOne(ProjectModel);

// @desc    Update specific project
// @route   GET /api/v1/Projects/:id
// @returns Void
// @access  Private
exports.updateProject = factory.updateOne(ProjectModel);

// @desc    Delete specific project
// @route   DELETE /api/v1/projects/:id
// @returns Void
// @access  Private
exports.deleteProject = factory.deleteOne(ProjectModel);
