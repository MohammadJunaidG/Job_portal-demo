const verifySignUp = require("./verifySignUp");
const authJwt = require("./authJwt");
const validateCompany = require("./companyValidator");

module.exports = {
    verifySignUp,
    authJwt, 
    validateCompany
}