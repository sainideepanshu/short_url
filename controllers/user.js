const User = require("../models/user.js");
const {v4:uuidv4} = require("uuid");
const {setUser} = require("../service/auth.js");

async function handleUserSignup(req,res){

    const {name,email,password} = req.body;

    await User.create({
        name,
        email,
        password,
    });

    return res.redirect("/");

}

async function handleUserLogin(req,res){

    const {email,password} = req.body;

    const user = await User.findOne({
        email,
        password,
    });

    if(!user){
        return res.render("login",{
            error:"Invalid username or password",
        });
    }

    const token = setUser(user);
    
    res.cookie("token",token); // attaching cookie in response , we can set domain also in cookies , means the set domain can only access this cookie , we can also set expiry date in cookies

    return res.redirect("/");

}


module.exports = {handleUserSignup,handleUserLogin};