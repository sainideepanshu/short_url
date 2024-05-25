const {getUser} = require("../service/auth.js");

function checkForAuthentication(req,res,next){

    const tokenCookie = req.cookies?.token;

    req.user = null;

    if(!tokenCookie){
        return next();
    }

    const token = tokenCookie;
    const user = getUser(token);

    console.log(user);

    req.user = user;
    return next();
}

function restrictTo(roles = []){  // roles is an array of roles like admin , normal user etc

    return function(req,res,next){ // using closures

        console.log(req.user);

        if(!req.user){
            return res.redirect('/login');
        }

        if(!roles.includes(req.user.role)){
            res.end("Unauthorized");
        }

        return next();
    }

}

module.exports = {restrictTo,checkForAuthentication};