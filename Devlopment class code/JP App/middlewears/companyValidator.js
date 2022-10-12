const Company = require("../models/company.model");
const User = require("../models/user.model");

const isUserHr = async (req, res, next) => {
    
    const user = await User.findOne({userId: req.userId});

    if(user.userType !== "HR"){
        return res.status(401).send({
            message: "Can not create a company. UserType is not 'HR'."
        });
    }    
    next();     
}

const isCompanyPresent = async (req, res, next) => {

    // const user = await User.findOne({userId: req.userId});

    // if(user.userType !== "HR"){
    //     res.status(401).send({
    //         message: "Can not create a company. UserType is not 'HR'."
    //     })
    //     return;
    // } 
 
    
    const company = await Company.findOne({name: req.body.name, address: req.body.address})


    if(company != null){
        if(company.name == req.body.name && company.address == req.body.address) {
            return res.status(403).send({
            message: "Company already present."
        })} 
    }

    next();
    
}


const validateCompany  = {
    isCompanyPresent: isCompanyPresent,
    isUserHr : isUserHr
}

module.exports = validateCompany