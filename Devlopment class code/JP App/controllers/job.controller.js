const Job = require("../models/job.model");
const User = require("../models/user.model");
const Company = require("../models/company.model")

exports.createJob = async (req, res) => {

    const jobObj = {
        title: req.body.title,
        description:  req.body.description,
    }
    const user = await User.findOne({userId: req.userId});

    if(user.userType == "APPLICANT"){
        return res.status(401).send({
            message: "Can not post the Job as the UserType is not 'HR'."
        })
    }

    if(user.companyId == null){
        return res.status(401).send({
            message: "HR is not registered in any compnay."
        })
    }
   
    const jobCreated = await Job.create(jobObj);

    if (jobCreated) {
        const finduser = await User.findOne({
            userId: req.userId
        })
        // console.log("*************************", finduser)
        finduser.jobsPosted.push(jobCreated._id);
        await finduser.save();
    }
    // console.log("********************", company)
    
    jobCreated.companyId = user.companyId;
    jobCreated.postedBy = user._id;
    await jobCreated.save();
    
    const company = await Company.findOne({_id : user.companyId })
    console.log(company);
    company.jobsPosted.push(jobCreated._id)
    await company.save();
    
    
    const response = {
        title: jobCreated.title,
        description: jobCreated.description,
    }
    
    res.status(200).send(response);

}

exports.applyJob = async (req, res) => {

    const user = await User.findOne({userId: req.userId});

    if(user.userType !== "APPLICANT"){
        
        return res.status(200).send({
            message: "Only user type applicant can apply for the job."
        })
        
    }else{
        
        const job = await Job.findOne({_id : req.params.id})
        job.applicants.push(user._id);
        user.jobsApplied.push(job._id);
        
        await job.save();
        await user.save();
        
        return res.status(200).send(job)
    }  
    
}

