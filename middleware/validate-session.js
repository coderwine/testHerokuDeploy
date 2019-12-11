require('dotenv').config();

const jwt = require('jsonwebtoken');
const sequelize = require('../db');
const User = sequelize.import('../models/user');

const validateSession = function(req,res,next) {
    if(req.method == 'OPTIONS') {
        next()
    } else {
        const sessionToken = req.headers.authorization; 
        if(!sessionToken) return res.status(403).send({ auth: false, message: 'No token provided.' }); 
        else { 
        jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => { 
            if(!err && decoded){
                User.findOne({where: { id: decoded.id}}).then(user => { 
                    if(!user) throw 'err';
                    req.user = user; 
                    next();
                },
                function(){
                    res.status(401).send({error: 'Not authorized'});
                });
            } else {
                res.status(400).send({error: 'Not authorized'});
            }
        });
        }
    }
}

module.exports = validateSession;