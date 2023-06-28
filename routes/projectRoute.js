const express = require("express");

const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const {
  createProjectValidator,
  getProjectValidator,
  updateProjectValidator,
  deleteProjectValidator,
} = require("../validators/projectValidator");

const router = express.Router();

router.route("/").get(getProjects).post(createProjectValidator, createProject);

router
  .route("/:id")
  .get(getProjectValidator, getProject)
  .put(updateProjectValidator, updateProject)
  .delete(deleteProjectValidator, deleteProject);

module.exports = router;
