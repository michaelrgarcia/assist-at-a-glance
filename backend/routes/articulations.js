/* eslint-disable no-undef */

// berkeley eecs major key: 9df99d8d-2540-4677-891f-a559d4801840
// year: 74, sending: 113, receiving: 79

const express = require("express");
const { deNest, alphaSort } = require("../public/utilities.js");
const {
  getArticulationData,
  createArticulationList,
} = require("../public/articulationTools.js");

const router = express.Router();

router.get("/:year/:sending/:receiving/:key/raw", async (req, res) => {
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

  const lowerDivs = deNest(articulationData.templateAssets);

  res.json(lowerDivs);
});

router.get("/:year/:sending/:receiving/:key", async (req, res) => {
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

  const allArticulations = createArticulationList(articulationData);

  res.json(allArticulations);
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
            }
          });
        });
      });
    }
  });

  classList = alphaSort(classList, "prefix");

  res.json(classList);

  // handle series (use irvine cs reqs as the url?)
});

module.exports = router;
