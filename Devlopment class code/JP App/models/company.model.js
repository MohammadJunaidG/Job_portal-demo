//Company->name, address, verified,[jobPostedIds],[hruserids](initiallyEmpty)
const mongoose = require("mongoose");
const { companyVerificationStatuses } = require("../utils/constants");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
    },
    companyInfo: {
      type: String,
    },
    verified: {
      type: String,
      default: companyVerificationStatuses.approved,
      enum: [
        companyVerificationStatuses.approved,
        companyVerificationStatuses.pending,
        companyVerificationStatuses.rejected,
      ],
    },
    jobsPosted: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Job",
    },
    hrs: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Company", companySchema);
