const jwt = require('jsonwebtoken');
const User = require('../models/Users');
require('dotenv').config();




const requireAuth = (req, res, next) => {
    // const token = req.cookies.jwt;
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    //check json web token exists and is verified
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err){
                console.log(err.message);
                // res.redirect('/signin');
                return res.status(403).json({ message: 'Unauthorized' });
            }else{
                next();
            }
        });
    }else{
        // res.redirect('/singin');
        return res.status(403).json({ message: 'Unauthorized' });

    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }else{
        res.locals.user = null;
        next();
    
    }
}


module.exports = { requireAuth, checkUser};