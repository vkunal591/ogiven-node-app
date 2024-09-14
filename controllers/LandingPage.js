const { LandingPage } = require("../models");

const addLandingPage = async (req, res, next) => {
  try {
    const {
      homeVideo,
      homeTitle,
      homeDesc,
      serviceVideo,
      serviceDesc,
      productDesc,
      successDesc,
      successImage,
      successFinishProject,
      successHappyCustomer,
      successIssueResolved,
      successAwardes,
      expertTeamDesc,
      outcomeDesc
    } = req.body;

    // const isLandingPageExist = await LandingPage.findOne({ email });
    // if (isLandingPageExist) {
    //   res.code = 400;
    //   throw new Error("already exist");
    // }

    const newLandingPage = new LandingPage({
      homeVideo,
      homeTitle,
      homeDesc,
      serviceVideo,
      serviceDesc,
      productDesc,
      successDesc,
      successImage,
      successFinishProject,
      successHappyCustomer,
      successIssueResolved,
      successAwardes,
      expertTeamDesc,
      outcomeDesc
    });
    console.log(newLandingPage);
    await newLandingPage.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "Submitted successfully"
    });
  } catch (error) {
    next(error);
  }
};

const updateLandingPage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const {
      homeVideo,
      homeTitle,
      homeDesc,
      serviceVideo,
      serviceDesc,
      productDesc,
      successDesc,
      successImage,
      successFinishProject,
      successHappyCustomer,
      successIssueResolved,
      successAwardes,
      expertTeamDesc,
      outcomeDesc
    } = req.body;

    const landingPage = await LandingPage.findById(id);
    if (!landingPage) {
      res.code = 404;
      throw new Error("LandingPage not found");
    }

    //   const isLandingPageExist = await LandingPage.findOne({ title });
    //   if (
    //     isLandingPageExist &&
    //     isLandingPageExist.title === title &&
    //     String(isLandingPageExist._id) !== String(landingPage._id)
    //   ) {
    //     res.code = 400;
    //     throw new Error("Title alraedy exist");
    //   }

    landingPage.homeTitle = homeTitle ? homeTitle : landingPage.homeTitle;
    landingPage.homeDesc = homeDesc ? homeDesc : landingPage.homeDesc;
    landingPage.homeVideo = homeVideo ? homeVideo : landingPage.homeVideo;
    landingPage.serviceVideo = serviceVideo
      ? serviceVideo
      : landingPage.serviceVideo;
    landingPage.serviceDesc = serviceDesc
      ? serviceDesc
      : landingPage.serviceDesc;
    landingPage.productDesc = productDesc
      ? productDesc
      : landingPage.productDesc;
    landingPage.successAwardes = successAwardes
      ? successAwardes
      : landingPage.successAwardes;
    landingPage.successDesc = successDesc
      ? successDesc
      : landingPage.successFinishProject;
    landingPage.successFinishProject = successFinishProject
      ? successFinishProject
      : landingPage.successFinishProject;
    landingPage.successHappyCustomer = successHappyCustomer
      ? successHappyCustomer
      : landingPage.successHappyCustomer;
    landingPage.successImage = successImage
      ? successImage
      : landingPage.successImage;
    landingPage.successIssueResolved = successIssueResolved
      ? successIssueResolved
      : landingPage.successIssueResolved;
    landingPage.expertTeamDesc = expertTeamDesc
      ? expertTeamDesc
      : landingPage.expertTeamDesc;
    landingPage.outcomeDesc = outcomeDesc
      ? outcomeDesc
      : landingPage.outcomeDesc;
    landingPage.updatedBy = _id;
    await landingPage.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "LandingPage updated successfully",
      details: { landingPage }
    });
  } catch (error) {
    next(error);
  }
};

const deleteLandingPage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const landingPage = await LandingPage.findById(id);
    if (!landingPage) {
      res.code = 404;
      throw new Error("Not found");
    }

    await LandingPage.findByIdAndDelete(id);

    res.status(200).json({
      code: 200,
      staus: true,
      message: "Deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

const getLandingPages = async (req, res, next) => {
  try {
    const { email, size, page } = req.query;
    let query = {};

    const sizeNumber = parseInt(size) || 10;
    const pageNumber = parseInt(page) || 1;

    if (email) {
      const search = RegExp(email, "i");

      query = { $or: [{ email: search }] };
    }

    const total = await LandingPage.countDocuments(query);
    const pages = Math.ceil(total / sizeNumber);

    const landingPage = await LandingPage.find(query)
      .skip((pageNumber - 1) * sizeNumber)
      .limit(sizeNumber)
      .sort({ _id: -1 });

    res.status(200).json({
      code: 200,
      status: true,
      message: "Get landingPage list successfully",
      details: { landingPage, total, pages }
    });
  } catch (error) {
    next(error);
  }
};

const getLandingPage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const landingPage = await LandingPage.findById(id);
    if (!landingPage) {
      res.code = 404;
      throw new Error("Not found");
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: "Get landingPage successfully",
      details: { landingPage }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addLandingPage,
  updateLandingPage,
  deleteLandingPage,
  getLandingPage,
  getLandingPages
};
