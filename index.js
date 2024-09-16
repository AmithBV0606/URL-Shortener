const express = require("express");
const app = express();
const PORT = 3000;

const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middleware/auth")

// Routes
const urlRoute = require("./routes/url");
const staticsRoute = require("./routes/staticRouter");
const userRouter = require("./routes/user");


const path = require("path");

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Database connection
const { connectToMongoDB } = require("./connect");
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Database connected")
);

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Middleware to parse form data
app.use(cookieParser());

// Route handling middlewares
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRouter);
app.use("/", checkAuth, staticsRoute);

app.listen(PORT, () => console.log(`Server started on port : ${PORT}`)); 