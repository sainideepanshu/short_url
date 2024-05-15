const shortid = require("shortid");

const URL = require("../models/url.js");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ err: "URL is required" });
  }

  const shortId = shortid(); // nanoid of length 8 characters

  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.status(201).json({ id: shortId });
}

async function handleGetAnalytics(req, res) {
  
    const shortId = req.params.shortId;

    const result = await URL.findOne({shortId});

    return res.status(200).json({totalClicks:result.visitHistory.length,analytics:result.visitHistory});
}

module.exports = { handleGenerateNewShortUrl, handleGetAnalytics };
