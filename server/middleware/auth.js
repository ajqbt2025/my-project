const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../Models/User");

//auth
exports.auth = async (req, res, next) => {
    try{

        console.log("BEFORE ToKEN EXTRACTION");
        //extract token
        const cookieToken = req.cookies?.token || null;
            const bodyToken   = req.body?.token || null;

            const authHeader  = req.header("Authorization");
            const headerToken = authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;

            const token = cookieToken || bodyToken || headerToken;
        console.log("AFTER ToKEN EXTRACTION");

        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }
        console.log("AFTER IF ToKEN EXTRACTION");
        console.log("AFTER IF ToKEN EXTRACTION",token);
        console.log(process.env.JWT_SECRET)
        //verify the token
        try{
          console.log("decode");
              const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
            console.log("Decoded JWT:");
            console.log("Decoded JWT:", req.user);

        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}




exports.isAdmin = (req, res, next) => {
  if (req.user.accountType !== "Admin") {
    return res.status(403).json({
      success: false,
      message: "Only admins can access this route",
    });
  }
  next();
};

exports.isUser = (req, res, next) => {
    console.log("accountType:",req.user.accountType)
  if (req.user.accountType !== "User") {
    return res.status(403).json({
      success: false,
      message: "Only users can access this route",
    });
  }
  next();
};