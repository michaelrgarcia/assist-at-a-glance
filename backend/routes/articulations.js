/* eslint-disable no-undef */

const express = require("express");
const { getJson, deNest, alphaSort, conjoin } = require("../utilities.js");

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
  // will remove "articulated" in url when done
  // when done, paste this code into the top route

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

  const availableArticulations = deNest(articulationData.articulations);

  let articulationGroup = [];

  availableArticulations.forEach((dataset) => {
    const articulationObj = dataset.articulation;

    const receiving = getReceivingCourses(articulationObj);
    const sending = getSendingCourses(articulationObj);

    articulationGroup.push({ receiving, sending });
  });

  // classList = alphaSort(classList, "prefix");

  res.json(articulationGroup);
});

//move below functions to utilities

async function getArticulationData(year, sending, receiving, key) {
  const articulationPage = `https://assist.org/api/articulation/Agreements?Key=${year}/${sending}/to/${receiving}/Major/${key}`;

  const json = await getJson(articulationPage);
  const articulationData = Object.values(json)[0];

  return articulationData;
}

function getReceivingCourses(articulationObj) {
  if (articulationObj.course) {
    const courseObj = articulationObj.course;

    return getCourse(courseObj);
  } else if (articulationObj.series) {
    // const seriesObj = articulationObj.series;
  }
}

function getSendingCourses(articulationObj) {
  //handle series...
  const sendingArticulation = articulationObj.sendingArticulation;
  const items = sendingArticulation.items;

  let courseList = [];

  items.forEach((courseObj) => {
    const courses = courseObj.items;

    if (courses.length > 1) {
      const connector = courseObj.courseConjunction;
      let courseGroup = createGroup(connector, courses);

      courseList.push(courseGroup);
    } else {
      const course = getCourse(courses[0]);

      courseList.push(course);
    }
  });

  if (items.length > 1) {
    const groupConnector = extractGroupConnector(sendingArticulation);

    return conjoin(courseList, groupConnector);
  } else {
    return courseList;
  }
}

// for lowerDiv function
function seriesBreakdown() {}

function extractGroupConnector(sendingArticulation) {
  const arr = sendingArticulation.courseGroupConjunctions;
  const lastItem = arr[arr.length - 1];

  return lastItem.groupConjunction;
}

function getCourse(courseObj) {
  const { prefix, courseNumber, courseTitle } = courseObj;

  return { prefix, courseNumber, courseTitle };
}

function createGroup(conjunction, groupCourses) {
  let group = [];
  const connector = conjunction;
  const coursesInGroup = groupCourses;

  // may not need these...
  const pad1 = connector.padStart(connector.length + 1, " ");
  const pad2 = pad1.padEnd(pad1.length + 1, " ");

  coursesInGroup.forEach((courseObj) => {
    const course = getCourse(courseObj);

    group.push(course);
  });

  group = alphaSort(group, "courseNumber");

  return conjoin(group, pad2);
}

//series function checks for articulation.type == "series"

module.exports = router;

// berkeley eecs major key: 9df99d8d-2540-4677-891f-a559d4801840

// year: 74, sending: 113, receiving: 79

/*

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
