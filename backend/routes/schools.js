/* eslint-disable no-undef */

const express = require("express");
const {
  getCommunityColleges,
  getFourYears,
  getMajorData,
} = require("../public/schoolTools.js");

const router = express.Router();

router.get("/communityColleges", async (req, res) => {
  const communityColleges = await getCommunityColleges();

  res.json(communityColleges);
});

router.get("/four-years", async (req, res) => {
  const fourYears = await getFourYears();

  res.json(fourYears);
});

router.get("/major-data/:receiving/:sending/:year", async (req, res) => {
  const receiving = req.params.receiving;
  const sending = req.params.sending;
  const year = req.params.year;

  const majorData = await getMajorData(receiving, sending, year);

  res.json(majorData);
});

module.exports = router;
