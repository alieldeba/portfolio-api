const express = require("express");

const {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
  uploadSkillImage,
  resizeSkillImage,
} = require("../controllers/skillController");

const {
  createSkillValidator,
  getSkillValidator,
  updateSkillValidator,
  deleteSkillValidator,
} = require("../validators/skillValidator");

const router = express.Router();

router
  .route("/")
  .get(getSkills)
  .post(uploadSkillImage, resizeSkillImage, createSkillValidator, createSkill);

router
  .route("/:id")
  .get(getSkillValidator, getSkill)
  .put(updateSkillValidator, updateSkill)
  .delete(deleteSkillValidator, deleteSkill);

module.exports = router;
