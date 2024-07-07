/* eslint-disable no-undef */

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 10000;

const schoolRouter = require("./routes/schools.js");
const articulationRouter = require("./routes/articulations.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/schools", schoolRouter);
app.use("/articulations", articulationRouter);

app.get("/", (req, res) => {
  res.send("welcome to the transfervision api :)");
});

app.listen(port);
