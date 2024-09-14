const mongoose = require("mongoose");

const landingPageSchema = mongoose.Schema(
  {
    homeVideo: { type: String },
    homeTitle: { type: String },
    homeDesc: { type: String },
    serviceVideo: { type: String },
    serviceDesc: { type: String },
    productDesc: { type: String },
    successDesc: { type: String },
    successImage: { type: String },
    successFinishProject: { type: String },
    successHappyCustomer: { type: String },
    successIssueResolved: { type: String },
    successAwardes: { type: String },
    expertTeamDesc: { type: String },
    outcomeDesc: { type: String },
  },
  { timestamps: true }
);

const LandingPage = mongoose.model("landingPage", landingPageSchema);
module.exports = LandingPage;
