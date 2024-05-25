const express = require("express");
const URL = require("../models/url.js");
const { restrictTo } = require("../middlewares/auth.js");
const router = express.Router();

router.get("/admin/urls",restrictTo(['ADMIN']),async (req,res) => {

  const allurls = await URL.find({});
  return res.render("home", {
    urls: allurls,
  });

});

router.get("/",restrictTo(['NORMAL','ADMIN']), async (req, res) => {  // this is an example of inline middleware
  const allurls = await URL.find({createdBy:req.user._id});
  return res.render("home", {
    urls: allurls,
  });
});

router.get("/signup", async (req, res) => {
  return res.render("signup");
});

router.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = router;
