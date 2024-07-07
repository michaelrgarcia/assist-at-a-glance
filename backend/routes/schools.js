/* eslint-disable no-undef */

const express = require("express");
const {
  getCommunityColleges,
  getFourYears,
  getMajorData,
  getLowerDivs,
} = require("../public/schoolTools.js");
const { getRawArticulationData } = require("../public/articulationTools.js");

const router = express.Router();

router.get("/community-colleges", async (req, res) => {
  const communityColleges = await getCommunityColleges();

  res.status(200).json(communityColleges);
});

router.get("/four-years", async (req, res) => {
  const fourYears = await getFourYears();

  res.status(200).json(fourYears);
});

router.get("/major-data/:receiving/:year", async (req, res) => {
  const receiving = req.params.receiving;
  const year = req.params.year;

  const majorData = await getMajorData(receiving, year);

  res.status(200).json(majorData);
});

router.get("/:year/:sending/:receiving/:key/lower-divs", async (req, res) => {
  const year = req.params.year;
  const sending = req.params.sending;
  const receiving = req.params.receiving;
  const key = req.params.key;

  try {
    const articulationData = await getRawArticulationData(
      year,
      sending,
      receiving,
      key
    );

    const classList = getLowerDivs(articulationData);

    res.status(200).json(classList);
  } catch (error) {
    res.send(`Error getting lower divs: ${error}`);
  }
});

router.get("/:year/:sending/:receiving/:key/raw", async (req, res) => {
  const year = req.params.year;
  const sending = req.params.sending;
  const receiving = req.params.receiving;
  const key = req.params.key;

  const articulationData = await getRawArticulationData(
    year,
    sending,
    receiving,
    key
  );

  res.status(200).json(articulationData.templateAssets);
});

module.exports = router;
