/* eslint-disable no-undef */

const { seriesBreakdown } = require("./schoolTools.js");
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

function getAttributes(courseObj) {
  const group = courseObj.items;
  let attributesArray = [];

  group.forEach((course) => {
    if (course.attributes.length >= 1) {
      const courseAttributes = course.attributes;

      courseAttributes.forEach((attribute) => {
        if (courseAttributes && courseAttributes.length) {
          const attributes = attribute.content;
          attributesArray.push({ attributes });
        }
      });
    }
  });

  attributesArray = alphaSort(attributesArray, "content");

  return attributesArray;
}

function getReceivingCourses(articulationObj) {
  if (articulationObj.course) {
    const courseObj = articulationObj.course;

    return getCourse(courseObj);
  } else if (articulationObj.series) {
    const seriesObj = articulationObj.series;

    return seriesBreakdown(seriesObj);
  }
}

function getSendingCourses(articulationObj) {
  const sendingArticulation = articulationObj.sendingArticulation;
  const items = sendingArticulation.items;

  if (!sendingArticulation.noArticulationReason) {
    let courseList = [];

    items.forEach((courseObj) => {
      const attributes = getAttributes(courseObj);
      const courses = courseObj.items;

      if (courses.length > 1) {
        const connector = courseObj.courseConjunction;
        let courseGroup = createGroup(connector, courses);

        if (attributes.length >= 1) {
          courseGroup.push(attributes);
        }

        courseList.push(courseGroup);
      } else {
        const course = getCourse(courses[0]);

        courseList.push(course);
      }
    });

    if (items.length > 1) {
      const groupConnector = extractGroupConnector(sendingArticulation);

      courseList = conjoin(courseList, groupConnector);

      return courseList;
    } else {
      return courseList;
    }
  } else {
    return sendingArticulation.noArticulationReason;
  }
}

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
  const connector = conjunction;
  const coursesInGroup = groupCourses;
  let group = [];

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
};
