const jwt = require('jsonwebtoken');
function verifyToken(req,res,next) {
    if(req.headers.authorization!==undefined){
        // console.log(req.headers.authorization.split(" ")[1]);
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,"nutrifyapp",(err,data)=>{
            if(!err){
                next();
            }
            else{
                res.status(403).send({msg:"Invalid Token"})
            }
        })
    }
    else{
        res.send({msg:"Please Send a token"})
    }
}

module.exports = verifyToken;