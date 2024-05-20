require("dotenv").config({ path: "./config.env" });

const express = require("express");
const mongoose = require("mongoose");
const recipesRouter = require("./routes/recipesRouter");
const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/usersRouter");
const bodyParser = require("body-parser");
const cors = require("./util/CORS");

const app = express();

app.use(cors);
app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/recipes", recipesRouter);

const DB = process.env.DATABASE;
const port = process.env.PORT;

mongoose
  .connect(DB)
  .then(() => {
    console.log("successful connection");
    const server = app.listen(port, () => {
      console.log("listening on port " + port);
    });
  })
  .catch((err) => console.log(err));
