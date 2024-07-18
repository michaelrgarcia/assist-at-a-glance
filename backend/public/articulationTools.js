/* eslint-disable no-undef */

const { seriesBreakdown } = require("./schoolTools.js");
const { deNest, alphaSort, conjoin } = require("./utilities.js");

function getChunkCollegeName(articulationData) {
  if (articulationData.sendingInstitution) {
    const sendingData = deNest(articulationData.sendingInstitution);
    let collegeName;

    sendingData.forEach((item) => {
      if (Array.isArray(item)) {
        if (item[0].name) {
          const name = item[0].name;

          collegeName = name;
        }
      }
    });

    return { collegeName };
  }
}

function getChunkArticulationData(jsonArray) {
  const dataChunk = [];

  jsonArray.forEach((json) => {
    const articulationData = Object.values(json)[0];
    const collegeName = getChunkCollegeName(articulationData);
    console.log(collegeName);

    const list = createArticulationList(articulationData);

    if (list) {
      if (list.length >= 2) {
        list.push(collegeName);
      }

      dataChunk.push(list);
    }
  });

  return dataChunk;
}

function createArticulationList(articulationData) {
  if (articulationData) {
    if (articulationData.articulations) {
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
  }
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
  if (sendingArticulation.items) {
    const items = sendingArticulation.items;

    if (!sendingArticulation.noArticulationReason) {
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

        courseList = conjoin(courseList, groupConnector);

        return courseList;
      } else {
        return courseList;
      }
    } else {
      return sendingArticulation.noArticulationReason;
    }
  }
}

function extractGroupConnector(sendingArticulation) {
  if (sendingArticulation.courseGroupConjunctions) {
    const arr = sendingArticulation.courseGroupConjunctions;
    const lastItem = arr[arr.length - 1];

    if (lastItem) {
      if (lastItem.groupConjunction) {
        return lastItem.groupConjunction;
      }
    }
  }
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

  group = alphaSort(group, ["courseNumber"]);

  return conjoin(group, pad2);
}

module.exports = {
  createArticulationList,
  getChunkArticulationData,
};
