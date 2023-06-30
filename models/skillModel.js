const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "name must be unique"],
      minlength: [1, "name is too short"],
      maxlength: [32, "name is too long"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
  },
  {
    timestamps: true,
  }
);

const addImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.HOST_URL}/uploads/skills/${doc.image}`;
    doc.image = imageUrl;
  }
};

skillSchema.post("init", (doc) => {
  addImageUrl(doc);
});

skillSchema.post("save", (doc) => {
  addImageUrl(doc);
});

module.exports = mongoose.model("Skill", skillSchema);
