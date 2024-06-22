/* eslint-disable no-undef */
const express = require("express");

const router = express.Router();

router.get("/:year/:sending/:receiving/:key", (req, res) => {
  res.send("Will send JSON from getArticulationData()");
});

module.exports = router;

/*

import { alphaSort, deNest, jsonFromServer } from "./utilities.js";

async function getArticulationData(year, sending, receiving, key) {
  const articulationPage = `https://assist.org/api/articulation/Agreements?Key=${year}/${sending}/to/${receiving}/Major/${key}`;

  const json = jsonFromServer(articulationPage);
  const articulationData = Object.values(json)[0];

  return articulationData;
}

function getLowerDivList(articulationData) {
// to continue, paste raw templateAssets into https://jsonviewer.stack.hu/
  const lowerDivs = deNest(articulationData.templateAssets);
  const classList = [];

  lowerDivs.forEach((obj) => {
    if (obj.type === "RequirementGroup") {
      const {sections} = obj;
      sections.forEach((section) => {
        section.rows.forEach((row) => {
          row.cells.forEach((cell) => {
            if (cell.course) {
              const {course} = cell;

              const {prefix, courseNumber, courseTitle} = course;

              classList.push({ prefix, courseNumber, courseTitle });
            }
          });
        });
      });
    }
  });

  return alphaSort(classList, "prefix");;

  // handle series (use irvine cs reqs as the url?)
}

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
