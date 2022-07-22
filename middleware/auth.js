const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(403).send({ message: "Please add token" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.user ={
      id :  decoded.sub
    }
  
    next();
  });
};

module.exports = verifyToken;
