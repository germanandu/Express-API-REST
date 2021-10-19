const jwt = require('jsonwebtoken');

module.exports = verifyToken = async (req,res,next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) return res.status(403).json({message: "No token provided"})
        const decoded = jwt.verify(token,'secret')
        next()
    } catch (error) {
        res.status(403).json({message: error})
    }
    
}