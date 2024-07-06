require("dotenv").config({ path: "./config.env" });

const express = require("express");
const mongoose = require("mongoose");
const recipesRouter = require("./routes/recipesRouter");
const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/usersRouter");
const ingredientsRouter = require("./routes/ingredientRouter");
const reviewsRouter = require("./routes/reviewRouter");

const bodyParser = require("body-parser");
const cors = require("./util/CORS");

const app = express();

app.use(cors);
app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/recipes", recipesRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/reviews", reviewsRouter);

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
