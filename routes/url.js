const express = require("express");

const router = express.Router();

const {handleGenerateNewShortUrl,handleGetAnalytics} = require("../controllers/url.js")

// Generates a new short URL and returnsthe shortened URL in the format example.com/random-id
router.post("/",handleGenerateNewShortUrl);


// Returns the clicks for the provided shortId
router.get("/analytics/:shortId",handleGetAnalytics); // dynamic route

module.exports = router;  
