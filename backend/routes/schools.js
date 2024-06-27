/* eslint-disable no-undef */

const express = require("express");
const {
  getCommunityColleges,
  getFourYears,
  getMajorData,
  getLowerDivs,
} = require("../public/schoolTools.js");
const { getArticulationData } = require("../public/articulationTools.js");

const router = express.Router();

router.get("/community-colleges", async (req, res) => {
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

router.get("/:year/:sending/:receiving/:key/lower-divs", async (req, res) => {
  const year = req.params.year;
  const sending = req.params.sending;
  const receiving = req.params.receiving;
  const key = req.params.key;

  const articulationData = await getArticulationData(
    year,
    sending,
    receiving,
    key
  );

  const classList = getLowerDivs(articulationData);

  res.json(classList);
});

module.exports = router;
