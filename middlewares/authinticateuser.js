const jwt = require("jsonwebtoken");
const SECRET = require('../constansts')
const getAdmin = (req, res, next) => {


    try {

        const token = req.header("token");


        if (!token) {
            res.send("please provide Auth token")
        }
        else {
            const data = jwt.verify(token, SECRET);


            req.userid = data.id;
            next();
        }



    } catch (error) {
        console.log("in auth token middleare " + error);
        res.send("Please provide a valid auth token")

    }





}
module.exports = getAdmin;