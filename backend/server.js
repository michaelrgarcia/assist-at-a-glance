/* eslint-disable no-undef */

const express = require("express");
const cors = require("cors");

const app = express();
const port = 10000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const schoolRouter = require("./routes/schools.js");

app.use(cors());

app.use("/schools", schoolRouter);

app.get("/", (req, res) => {
  res.send("welcome to the transfervision api :)");
});

app.listen(port);
