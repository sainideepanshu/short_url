const express = require("express");

const app = express();

const urlRoutes = require("./routes/url.js");

const { connectToMongoDB } = require("./connect.js");

const URL = require("./models/url.js");

const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url");

app.use(express.json()); // this middleware will help in parsing the incoming client request body

app.use("/url", urlRoutes);

// Redirects the user to the original url
app.get("/url/:shortId", async (req, res) => {
  // dynamic route

  const shortId = req.params.shortId;

  // this will find the entry in database using shortId and will update visitHistory(it will push in array) , and in end will give us the document/entry/record corressponding to it
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamps: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log(`Server started at PORT : ${PORT}`);
});
