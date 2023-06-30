const express = require("express");

const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
  resizeProjectImage,
} = require("../controllers/projectController");

const {
  createProjectValidator,
  getProjectValidator,
  updateProjectValidator,
  deleteProjectValidator,
} = require("../validators/projectValidator");

const router = express.Router();

router
  .route("/")
  .get(getProjects)
  .post(
    uploadProjectImage,
    resizeProjectImage,
    createProjectValidator,
    createProject
  );

router
  .route("/:id")
  .get(getProjectValidator, getProject)
  .put(updateProjectValidator, updateProject)
  .delete(deleteProjectValidator, deleteProject);

module.exports = router;
