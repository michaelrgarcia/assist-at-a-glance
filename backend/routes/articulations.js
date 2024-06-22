/* eslint-disable no-undef */
const express = require("express");

const router = express.Router();

router.get("/:year/:sending/:receiving/:key", (req, res) => {
  res.send("Will send JSON from getArticulationData()");
});

module.exports = router;
