const User = require("../models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const objectConvertor = require("../utils/objectConverter")

exports.singup = async (req, res) => {
                 
    const userObj = {

        name: req.body.name,
        userId : req.body.userId,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 7),
        education: req.body.education,
        userType: req.body.userType         
    } 

   
    const user = await User.create(userObj);

    if(req.body.userType === "ADMIN"){
        console.log("User type admin alerady presnt in system.");
        res.status(401).send({
            message: "ADMIN already present in the system.'HR' or 'APPLICANT' are the allowed values."
        })
        return;
    }
       
    const response = {
        name: user.name,
        userId: user.userId,
        email: user.email,
        education: user.education,
        userType : user.userType       
    }

    res.status(200).send(response);
}


exports.singin = async (req, res) => {

    try {
        const finduser = req.body.userId;

        const user = await User.findOne({userId : finduser});

        if(user==null){
                res.status(404).send({
                message: "User not found."
            })
            return;
        }
        
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)
        if(!isPasswordValid){
            res.status(404).send({
                message: "In-correct password."
            })
            return;
        }

        const token = jwt.sign({
            id: user.userId}, 
            process.env.SECRET,
            {expiresIn: 500}
        )


        const response = {
            user: user.name,
            userId: user.userId,
            email:user.email,
            eduction:user.education,
            userType: user.userType,
            userStatus : user.userStatus,
            accessToken: token
        }

        res.status(200).send(response)
    }catch(err){
        console.log("some internal error happen", err.message)
        res.status(500).send({ message : "Internal server error"})
    }
}