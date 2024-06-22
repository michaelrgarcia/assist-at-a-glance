/* eslint-disable no-undef */

const express = require("express");
const app = express();
const port = 10000;

app.use(express.static("../frontend/dist/"));

const schoolRouter = require("./routes/schools.js");
const articulationRouter = require("./routes/articulations.js");

app.use("/schools", schoolRouter);
app.use("/articulations", articulationRouter);

app.listen(port);
