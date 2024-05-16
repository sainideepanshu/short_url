const express = require("express");

const app = express();
const path = require("path"); // built in module
const urlRoutes = require("./routes/url.js");
const staticRoute = require("./routes/staticRouter.js");
const { connectToMongoDB } = require("./connect.js");

const URL = require("./models/url.js");

const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url");

// set the view engine to ejs
app.set("view engine", "ejs"); // telling express that my view engine is ejs

app.set("views", path.resolve("./views")); // telling that all my ejs files/views are in ./views folder

app.use(express.json()); // this middleware will help in parsing the incoming client request body

app.use(express.urlencoded({extended:false,})); // this middleware will help in parsing the form data from incoming ejs form data request body

app.use("/url", urlRoutes);
app.use("/",staticRoute);

app.get("/test", async (req, res) => {
  const allURLs = await URL.find({});
  return res.render("home", {
    urls: allURLs, // sending variables to ejs files
  });
});

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
