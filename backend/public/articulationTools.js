/* eslint-disable no-undef */

const { getJson, deNest, alphaSort, conjoin } = require("./utilities.js");

async function getArticulationData(year, sending, receiving, key) {
  const articulationPage = `https://assist.org/api/articulation/Agreements?Key=${year}/${sending}/to/${receiving}/Major/${key}`;

  const json = await getJson(articulationPage);
  const articulationData = Object.values(json)[0];

  return articulationData;
}

function createArticulationList(articulationData) {
  const availableArticulations = deNest(articulationData.articulations);

  let articulationGroup = [];

  availableArticulations.forEach((dataset) => {
    const articulationObj = dataset.articulation;

    const receiving = getReceivingCourses(articulationObj);
    const sending = getSendingCourses(articulationObj);

    articulationGroup.push({ receiving, sending });
  });

  return articulationGroup;
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
//checks for articulation.type == "series"
function seriesBreakdown() {}

function extractGroupConnector(sendingArticulation) {
  const arr = sendingArticulation.courseGroupConjunctions;
  const lastItem = arr[arr.length - 1];

  return lastItem.groupConjunction;
}

function getCourse(courseObj) {
  //check for attributes
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

module.exports = {
  createArticulationList,
  getArticulationData,
  getReceivingCourses,
  getSendingCourses,
  extractGroupConnector,
  getCourse,
  createGroup,
};
