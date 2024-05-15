const express = require("express");

const router = express.Router();

const {handleGenerateNewShortUrl} = require("../controllers/url.js")

// Generates a new short URL and returnsthe shortened URL in the format example.com/random-id
router.post("/",handleGenerateNewShortUrl);

module.exports = router;  
