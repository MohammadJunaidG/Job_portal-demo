const authController = require("../controllers/authController")
const {verifySignUp} = require("../middlewears")



module.exports = (app) => {
    
    app.post("/jobportal/api/v1/signup", verifySignUp.validateSignupRequestBody, authController.singup)
    
    app.post("/jobportal/api/v1/signin", verifySignUp.validateSignInRequestBody, authController.singin)
    
}