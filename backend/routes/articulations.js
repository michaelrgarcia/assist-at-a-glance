/* eslint-disable no-undef */

const express = require("express");
const { getJson, deNest, alphaSort } = require("../utilities.js");

const router = express.Router();

// router below is for testing purposes
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

  res.json(articulationData);
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

router.get("/:year/:sending/:receiving/:key/articulated", async (req, res) => {
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

  const availableArticulations = deNest(articulationData.articulations);

  // let classList = [];

  // classList = alphaSort(classList, "prefix");

  res.json(availableArticulations);

  // handle series (use irvine cs reqs as the url?)
});

async function getArticulationData(year, sending, receiving, key) {
  const articulationPage = `https://assist.org/api/articulation/Agreements?Key=${year}/${sending}/to/${receiving}/Major/${key}`;

  const json = await getJson(articulationPage);
  const articulationData = Object.values(json)[0];

  return articulationData;
}

module.exports = router;

// berkeley eecs major key: 9df99d8d-2540-4677-891f-a559d4801840

// sending: 113, receiving: 79, year: 74

/*

export default async function organizeArticulations(articulationData) {
// to continue, paste raw templateAssets into https://jsonviewer.stack.hu/
  const availableArticulations = deNest(articulationData.articulations);

  availableArticulations.forEach((obj) => {
    const uniCourse = obj.articulation.course
    const ccCourse = obj.articulation.sendingArticulation;
    
    code block below is commented out

    if (obj.articulation.course) {
      const {prefix, courseNumber, courseTitle} = uniCourse
      const receiving = {prefix, courseNumber, courseTitle}

      const coursePair = {receiving};
      console.log(coursePair);
    }

    

    
    
    // for each obj.articulation ...
  });

  return availableArticulations;
  // handle series
}

const eecsData = await getArticulationData(
  74,
  17,
  79,
  "9df99d8d-2540-4677-891f-a559d4801840",
);

 console.log(eecsData);
organizeArticulations(eecsData);
 console.log(getLowerDivList(eecsData));

*/
