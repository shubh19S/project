const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  
    const authHeader = req.headers.authorization

    if(!authHeader){
        res.status(403).send({message: "Please add token"})
    }

    const token = authHeader  

    jwt.verify(token, process.env.SECRET_KEY, function (err, result) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

       
        next(); 
    });
}

module.exports = verifyToken;