/* eslint-disable no-undef */

const express = require("express");
const {
  getCommunityColleges,
  getFourYears,
  getMajorData,
  getLowerDivs,
} = require("../public/schoolTools.js");

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

  // to continue, paste raw templateAssets into https://jsonviewer.stack.hu/

  const lowerDivs = deNest(articulationData.templateAssets);
  let classList = [];

  lowerDivs.forEach((obj) => {
    if (obj.type === "RequirementGroup") {
      const { sections } = obj;
      sections.forEach((section) => {
        section.rows.forEach((row) => {
          row.cells.forEach((cell) => {
            if (cell.course) {
              const { course } = cell;

              const { prefix, courseNumber, courseTitle } = course;

              classList.push({ prefix, courseNumber, courseTitle });
            } else if (cell.series) {
              // series function goes here. pass in the series obj
            }
          });
        });
      });
    }
  });

  classList = alphaSort(classList, "prefix");

  res.json(classList);
});

module.exports = router;
