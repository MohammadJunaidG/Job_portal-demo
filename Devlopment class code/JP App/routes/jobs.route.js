const jobController = require("../controllers/job.Controller")
const {verifyToken} = require("../middlewears/authJWT")


module.exports = (app) => {
    
    app.post("/jobportal/api/v1/jobs", verifyToken, jobController.createJob)
    
    app.put("/jobportal/api/v1/jobsApplication/:id", verifyToken, jobController.applyJob)
    
    
}