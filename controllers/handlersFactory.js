const { default: slugify } = require("slugify");

const showErrors = require("../utils/errorsFunction");

exports.deleteOne = (Model) => async (req, res, next) => {
  const { id } = req.params;

  const document = await Model.findByIdAndDelete(id);

  if (document === null) {
    // return next(new ApiError("Document Not Found", 404));
    return next(showErrors(res, 404, "Document not found"));
  }

  res.status(200).json({
    status: 200,
    message: "Document deleted",
  });
};

exports.createOne = (Model) => async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  await Model.create(req.body)
    .then((document) => {
      res.status(201).json(document);
    })
    .catch(() => {
      next(
        showErrors(
          res,
          400,
          "Error when creating document, it might be duplicated"
        )
      );
    });
};

exports.updateOne = (Model) => async (req, res, next) => {
  const { id } = req.params;

  req.body.slug = slugify(req.body.name);

  const document = await Model.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!document) {
    return next(showErrors(res, 404, "Document not found"));
  }

  res.status(302).json(document);
};

exports.getOne = (Model) => async (req, res, next) => {
  const { id } = req.params;
  const document = await Model.findById(id);
  if (!document) {
    return next(showErrors(res, 404, "Document not found"));
  }
  res.status(302).json(document);
};

exports.getAll =
  (Model, modelName) =>
  //   asyncHandler(async (req, res) => {
  //     const filter = req.filterObj || {};

  //     // Build the query
  //     const numberOfDocuments = await Model.countDocuments();
  //     const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
  //       .paginate(numberOfDocuments)
  //       .filter()
  //       .sort()
  //       .limitFields()
  //       .search(modelName);

  //     const { mongooseQuery, paginationResults } = apiFeatures;

  //     // Execute query
  //     const documents = await mongooseQuery;

  //     res.status(200).json({
  //       results: documents.length,
  //       paginationResults,
  //       data: documents,
  //     });
  //   });

  async (req, res, next) => {
    //   const page = +(req.query.page || 1);
    //   const limit = +req.query.limit;
    //   const skip = (page - 1) * limit;
    //   const numberOfSkills = await SkillModel.count();

    const skills = await Model.find();

    res.status(200).json({
      data: skills,
    });
  };
