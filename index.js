const express = require("express");
const app = express();
const PORT = 3000;

const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");

const path = require("path");
const staticsRoute = require("./routes/staticRouter");

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Database connected")
);

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Middleware to parse form data

app.use("/url", urlRoute);

app.use("/", staticsRoute);

app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));