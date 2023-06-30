const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "name must be unique"],
      minlength: [3, "name is too short"],
      maxlength: [32, "name is too long"],
    },
    slug: {
      type: String,
    },
    desc: {
      type: String,
      required: [true, "description is required"],
      minlength: [3, "description is too Short"],
      maxlength: [100, "description is too long"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    previewLink: {
      type: String,
      required: [true, "Preview Link is required"],
    },
    sourceLink: String,
  },
  {
    timestamps: true,
  }
);

const addImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.HOST_URL}/uploads/projects/${doc.image}`;
    doc.image = imageUrl;
  }
};

projectSchema.post("init", (doc) => {
  addImageUrl(doc);
});

projectSchema.post("save", (doc) => {
  addImageUrl(doc);
});

module.exports = mongoose.model("Project", projectSchema);
