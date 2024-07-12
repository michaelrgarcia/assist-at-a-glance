/* eslint-disable no-undef */

const {
  seriesBreakdown,
  getCollegeName,
  getCommunityColleges,
} = require("./schoolTools.js");
const { getJson, deNest, alphaSort, conjoin } = require("./utilities.js");

// parameters will come from the front end (will still use schoolTools functions)

async function getRawArticulationData(year, sending, receiving, key) {
  const articulationPage = `https://assist.org/api/articulation/Agreements?Key=${year}/${sending}/to/${receiving}/Major/${key}`;

  const json = await getJson(articulationPage);
  const articulationData = Object.values(json)[0];

  return articulationData;
}

async function getArticulationParams(receivingId, majorKey) {
  const articulationParams = [];
  const communityColleges = await getCommunityColleges();

  const year = 74;
  const receiving = receivingId;
  const key = majorKey;

  communityColleges.forEach((college) => {
    if (college.id) {
      const sending = college.id;
      articulationParams.push({ year, sending, receiving, key });
    }
  });

  return articulationParams;
}

async function processRequest(request) {
  const { year, sending, receiving, key } = request;
  const articulationPage = `https://assist.org/api/articulation/Agreements?Key=${year}/${sending}/to/${receiving}/Major/${key}`;

  const collegeNameCache = new Map();

  async function getCachedCollegeName(sending) {
    if (!collegeNameCache.has(sending)) {
      collegeNameCache.set(sending, await getCollegeName(sending));
    }

    return collegeNameCache.get(sending);
  }

  try {
    const [json, collegeName] = await Promise.all([
      getJson(articulationPage),
      getCachedCollegeName(sending),
    ]);

    const articulationData = Object.values(json)[0];

    if (articulationData) {
      console.log(`processing articulations for ${collegeName.collegeName}...`);
      const list = createArticulationList(articulationData);

      if (list.length >= 2) {
        list.push(await collegeName);
        return list;
      }
    }
  } catch (error) {
    console.error("Error processing request:", error);
  }
  return null;
}

async function processChunk(results, chunk) {
  const chunkResults = await Promise.all(chunk.map(processRequest));
  results.push(...chunkResults.filter((result) => result !== null));

  console.log("chunk finished");
}

async function getArticulationData(articulationParams, chunkSize = 4) {
  const results = [];
  const chunkPromises = [];

  const totalChunks = Math.ceil(articulationParams.length / chunkSize);

  for (let i = 0; i < totalChunks; ) {
    const start = i * chunkSize;
    const end = start + chunkSize;
    const chunk = articulationParams.slice(start, end);

    chunkPromises.push(processChunk(results, chunk));

    if (chunkPromises.length === 4 || i === totalChunks - 1) {
      await Promise.all(chunkPromises);
      chunkPromises.length = 0;
    }

    i += 1;

    console.log("chunk finished");
  }

  console.log("all chunks finished");

  return results;
}

function createArticulationList(articulationData) {
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
  getArticulationData,
  getRawArticulationData,
  getArticulationParams,
};
