const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");
const User = require("./models/user.model");
const Company = require("./models/company.model");
const Job = require("./models/job.model");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


/**
 * Initialize the connection to the mongoDB
 */
mongoose.connect(dbConfig.DB_URI);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to MongoDB");
});
db.once("open", () => {
  console.log("Connected to mongoDB");
  init();
});

/**
 * Create the ADMIN user at the boot time
 */
async function init () {

  try {

    await User.collection.drop();
    await Job.collection.drop();
    await Company.collection.drop();

    const adminUser = await User.create({
      name: "admin",
      userId: "admin",
      password: bcrypt.hashSync("Junaid", 8),
      email: "admin@email.com",
      userType: "ADMIN",
    });

    console.log("Admin user created\n", adminUser);
/*
    const company = await Company.create({
      name: "Main",
      address: "xyz address",
      verified: "APPROVED",
      companyInfo: "A multi-national brand."
    });
    
    //find the company id and and then create a hr of that company
    const hrUser = await User.create({
      name: "demoHR",
      userId: "demoHR",
      password: bcrypt.hashSync("Welcome1", 8),
      email: "hr@email.com",
      companyId: company._id,
      userType: "HR",
      userStatus: "APPROVED", //approved for testing
    });
    
    //now place the hr in the company too
    company.hrs.push(hrUser._id);
    await company.save(); //save it in db
    
    console.log("HR entry added to the compnay \n", company);
    
/*
    console.log("A demo company created\n", company);
    
    
    const applicantUser = await User.create({
      name: "demoApplicant",
      userId: "demoApplicant",
      password: bcrypt.hashSync("Welcome1", 8),
      email: "demo@email.com",
      userType: "APPLICANT",
    });
    console.log("A demo applicant created\n", applicantUser);
    
    
    console.log("A demo HR created \n", hrUser);


    
    //now the hrUser can post a job
    const job = await Job.create({
      title: "Job",
      description: "Description",
      company: company._id, //usually it will be picked by login user company
      postedBy: hrUser._id,
    });
    console.log("A demo job created. \n", job);
    
    //now update the company jobposted
    company.jobsPosted.push(job._id);
    
    //save it in db
    await company.save();           
    console.log("Job Id added to the Company \n", company);

    //applicant applying a job
    job.applicants.push(applicantUser._id);
    await job.save();
    
    //also update the applicantUser
    applicantUser.jobsApplied.push(job._id);
    await applicantUser.save();
    
    console.log("Applicant userId added to the job. \n", job);
    console.log("JobId added to the applicant. \n", applicantUser);
  */
  } catch (err) {
    console.log("err in db initialization , " + err);
  }
}


require("./routes/auth.route")(app);
require("./routes/jobs.route")(app);
require("./routes/company.route")(app);

app.listen(serverConfig.PORT, () => {
  console.log("Server started at port number: " ,serverConfig.PORT 
  )})
