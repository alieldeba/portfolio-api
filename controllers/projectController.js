const ApiError = require("../utils/apiError");
const ProjectModel = require("../models/projectModel");

// @desc    Gets all projects
// @route   GET /api/v1/projects
// @returns List of projects
// @access  Public
exports.getProjects = async (req, res, next) => {
  //   const page = +(req.query.page || 1);
  //   const limit = +req.query.limit;
  //   const skip = (page - 1) * limit;
  //   const numberOfProjects = await ProjectModel.count();

  const projects = await ProjectModel.find();

  if (!projects) {
    return next(new ApiError("No Projects Found", 500));
  }

  res.status(200).json({
    data: projects,
  });
};

// @desc    Gets specific project
// @route   GET /api/v1/projects/:id
// @returns Specific project
// @access  Public
exports.getProject = async (req, res, next) => {
  const { id } = req.params;
  const project = await ProjectModel.findById(id);
  if (!project) {
    return next(new ApiError("Category Not Found", 404));
  }
  res.status(302).json(project);
};

// @desc    Creates new project
// @route   POST /api/v1/projects
// @returns Void
// @access  Private
exports.createProject = async (req, res, next) => {
  await ProjectModel.create(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      next(new ApiError(err, 400));
    });
};

// @desc    Update specific project
// @route   GET /api/v1/Projects/:id
// @returns Void
// @access  Private
exports.updateProject = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return next(new ApiError("Project name is required", 400));
  }

  const project = await ProjectModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(302).json(project);
};

// @desc    Delete specific project
// @route   DELETE /api/v1/projects/:id
// @returns Void
// @access  Private
exports.deleteProject = async (req, res, next) => {
  const { id } = req.params;

  const project = await ProjectModel.findByIdAndDelete(id);

  if (project === null) {
    return next(new ApiError("Project Not Found", 404));
  }

  res.status(200).json({
    status: 200,
    message: "Project deleted",
  });
};
