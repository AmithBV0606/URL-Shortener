const express = require("express");
const app = express();
const PORT = 3000;

const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Database connected")
);

app.use(express.json());

app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));