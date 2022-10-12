const Company = require("../models/company.model");
const User = require("../models/user.model");

exports.createCompany = async (req, res) => {

    const companyObj = {
        name: req.body.name,
        address: req.body.address,
        companyInfo: req.body.companyInfo
    }
    const user = await User.findOne({userId : req.userId})
      
    const companyCreated = await Company.create(companyObj);
    companyCreated.hrs.push(user._id);
    await companyCreated.save();

    console.log(companyCreated);
    
    user.companyId = companyCreated._id
    await user.save();

    const response = {
        name: companyCreated.name,
        address: companyCreated.address,
        companyInfo: companyCreated.companyInfo,
        hrs: [user._id]  
    }
    res.status(201).send(response);
}



exports.registerHR = async(req, res) => {

    try{
        const company = await Company.findOne({"_id" : req.params.id});
    
        console.log(company);

        if(company === null){
            return res.status(404).send({
                message: "Company not found. Company Id is incorrect."
            })
        }
        
        const user = await User.findOne({userId: req.userId});

        console.log(user);
        
        if(user.userType !== "ADMIN"){
            return res.status(401).send({
                message: "User is not a 'Admin'."
        })} 
        
        company.hrs.push(user._id);        
        user.companyId = company._id;
        user.companyName = company.name;
            
        await company.save();
        await user.save();

        return res.status(201).send(user);

    } catch (err)  {
        console.log("Some error while updating ticket ", err.message);
        res.status(500).send({
            message: "Some internal error while registering the HR"
        })
    }
}