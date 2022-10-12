/**
 * User Schema -> username, email, password, userType, userStatus, jobApplied, jobPosted
 */

const mongoose = require("mongoose");

const {userStatuses, userTypes} = require("../utils/constants")

const userSchema = mongoose.Schema({

  name: {
    type : String,
    required : true,
    trim: true
  },
  userId: {
    type : String,
    required : true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minLength: 10    
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  userType: {
    type: String,
    default: userTypes.applicant,
    enum: [userTypes.applicant, userTypes.admin, userTypes.hr]
  },
  education: {
    type: String
  },
  userStatus: {
    type: String,
    default: userStatuses.approved,
    enum: [userStatuses.approved, userStatuses.rejected, userStatuses.rejected ]
  },
  jobsApplied: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "jobs" 
  },
  jobsPosted: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "hr" 
  },
  companyName:{
    type: String,
    unique : true,
    ref: "company"
  },
  companyId :{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "comapny"
  }
    
},
  { timestamps: true, versionKey: false }
)

module.exports = mongoose.model("User", userSchema);