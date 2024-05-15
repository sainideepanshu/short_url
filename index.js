const express = require("express");

const app = express();

const urlRoutes = require("./routes/url.js");

const {connectToMongoDB} = require("./connect.js");

const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url");

app.use(express.json());  // this middleware will help in parsing the incoming client request body

app.use("/url",urlRoutes);

app.listen(PORT,()=>{
    console.log(`Server started at PORT : ${PORT}`);
})