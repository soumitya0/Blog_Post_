const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // gettimg token from header
  const token = req.header("x-auth-token");
  console.log(token);

  //checking if not token
  if (!token) {
    return res.status(401).json({
      msg: "no token, Autherization denied",
    });
  }

  // if we get the token
  //verfiy
  try {
    //this deCode have the payLoad this payload have the user ID
    const deCode = jwt.verify(token, config.get("jwtSecret"));

    //creating a objct in req with user
    req.user = deCode.user;

    console.log("middle ware");
    console.log(req.user.id);

    // in playload data  we have a object user that contain id
    //and this id is passed to req object that is re.user
    //this req object  is user will assecc  by Route the GET method

    console.log("i am from auth middlewae folder " + req.user.id);

    next();
  } catch (error) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
