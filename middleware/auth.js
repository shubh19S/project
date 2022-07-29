const tokenService = require("./../services/tokenService");

const verifyToken = async(req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(403).send({ auth: false, message: "Please add token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    
    const decoded = await tokenService.verifyToken(token,);

    req.user = {
      id: decoded.sub,
    };

    next();
  } catch (err) {
    return res.status(500).sendResponse("Failed to authenticate token.");
  }
};

module.exports = verifyToken;
