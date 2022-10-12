const jwt = require("jsonwebtoken");
const User = require("../models/user.model")
const constants = require("../utils/constants")

/**
 * Define verifyToken function
 */

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    /**
     * check if the token is provided
     */

    if(!token){
        return res.status(403).send({
            message: "No token provided ! Access denied.",
        })
    }

    /**
     * Validate the token.
     */
    jwt.verify(token, process.env.SECRET, (err, decoded) =>{
        if(err){
            return res.status(401).send({
                message: "UnAuthorized ! Token verification failed."
            })
        }
        req.userId = decoded.id; //Read the value of the user id from the token and set it in the request for further use
        next();
    })
}

/**
 * Define a function to check that requester is admin or not.
 */
const isAdmin = async (req, res, next) => {
    const user = await User.findOne({userId : req.userId});

    if(user && user.userType == constants.userTypes.admin){
        next();
    } else {
        res.status(400).send({
            message : " Only admin user allowed to access this endpoint. "
        })
    }
}

const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
}

module.exports = authJwt;