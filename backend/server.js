/* eslint-disable no-undef */

const express = require("express");
const app = express();
const port = 10000;

app.use(express.static("../frontend/dist/"));

// eslint-disable-next-line no-undef
const schoolRouter = require("./routes/schools.js");
const articulationRouter = require("./routes/articulations.js");

/*  

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

*/

app.listen(port);
