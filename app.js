require("dotenv").config({ path: "./config.env" });

const express = require("express");
const mongoose = require("mongoose");
const recipesRouter = require("./routes/recipesRouter");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use("/recipes", recipesRouter);

const DB = process.env.DATABASE;
const port = 3000;

mongoose.connect(DB).then(() => {
  console.log("successful connection");
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
