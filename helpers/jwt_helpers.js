const JWT = require('jsonwebtoken')
module.exports={
    verifyAccessToken: (req, res, next)=>{
        if(!req.headers['authorization']){
            return res.status(401).json({ message: 'UnAuthorized'})
        }
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        // console.log(JWT.sign(token, process.env.ACCESS_TOKEN_SECRET))
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload)=>{
            if(err){
                return res.status(401).json({ message: 'UnAuthorized'})
            }
            req.payload = payload
            next()
        })
    }
}