const companyController = require("../controllers/company.Controller")
const {authJwt} = require("../middlewears")
const {validateCompany} = require("../middlewears")


module.exports = (app) => {
    
    app.post(
            "/jobportal/api/v1/companies", 
            [authJwt.verifyToken, validateCompany.isUserHr, validateCompany.isCompanyPresent], 
            companyController.createCompany
    );

    app.put("/jobportal/api/v1/companies/:id", [authJwt.verifyToken], companyController.registerHR);    
  
}