/* eslint-disable no-undef */

const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const app = express();
const port = 10000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const schoolRouter = require("./routes/schools.js");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests allowed every 15 minutes
  message: "Request limit reached. Try again in 15 minutes.",
});

app.use(limiter);

app.use("/schools", schoolRouter);

app.get("/", (req, res) => {
  res.send("welcome to the transfervision api :)");
});

app.listen(port);
