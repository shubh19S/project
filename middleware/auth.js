const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    const token = authHeader.split(" ")[1]

    // const payload = jwt.verify(token,secret)

    if(!token){
        res.status(403).send({message: "No token Found"})
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        console.log(decoded)
        
        // req.user = decoded;
        next(); 
    });
}


module.exports = verifyToken;