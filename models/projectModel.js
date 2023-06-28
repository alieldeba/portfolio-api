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
    desc: {
      type: String,
      required: [true, "description is required"],
      minlength: [3, "description is too Short"],
      maxlength: [100, "description is too long"],
    },
    previewLink: {
      type: String,
      required: [true, "Preview Link is required"],
    },
    sourceLink: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

// const addImageUrl = (doc) => {
//   if (doc.image) {
//     const imageUrl = `${process.env.HOST_URL}/uploads/brands/${doc.image}`;
//     doc.image = imageUrl;
//   }
// };

// projectSchema.post("init", (doc) => {
//   addImageUrl(doc);
// });

// projectSchema.post("save", (doc) => {
//   addImageUrl(doc);
// });

module.exports = mongoose.model("Project", projectSchema);
