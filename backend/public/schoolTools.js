/* eslint-disable no-undef */

const {
  getJson,
  alphaSort,
  deNest,
  conjoin,
} = require("../public/utilities.js");

async function getCommunityColleges() {
  const institutions = "https://assist.org/api/institutions";
  const json = await getJson(institutions);
  const schoolData = Object.values(json); // array

  let schoolList = [];

  schoolData.forEach((school) => {
    if (school.isCommunityCollege) {
      const nameList = school.names;
      const { name } = nameList[nameList.length - 1];
      const { id } = school;

      schoolList.push({ name, id });
    }
  });

  schoolList = alphaSort(schoolList, ["name"]);

  return schoolList;
}

async function getCollegeName(sendingId) {
  const communityColleges = await getCommunityColleges();
  let collegeName;

  communityColleges.forEach((college) => {
    if (sendingId == college.id) {
      collegeName = college.name;
    }
  });

  return { collegeName };
}

async function getFourYears() {
  const institutions = "https://assist.org/api/institutions";
  const json = await getJson(institutions);
  const schoolData = Object.values(json); // array

  let schoolList = [];

  schoolData.forEach((school) => {
    if (!school.isCommunityCollege) {
      const nameList = school.names;
      const { name } = nameList[nameList.length - 1];
      const { id } = school;

      schoolList.push({ name, id });
    }
  });

  schoolList = alphaSort(schoolList, ["name"]);

  return schoolList;
}

async function getMajorData(receiving, year) {
  const sending = 6; // placeholder CCC
  const majorKeysByUni = `https://assist.org/api/agreements?receivingInstitutionId=${receiving}&sendingInstitutionId=${sending}&academicYearId=${year}&categoryCode=major`;
  const json = await getJson(majorKeysByUni);
  const majors = Object.values(json); // array

  let majorData = [];

  majors[0].forEach((dataset) => {
    const major = dataset.label;
    const keyStr = dataset.key;
    const key = keyStr.split("/").pop();

    majorData.push({ major, key });
  });

  majorData = alphaSort(majorData, ["major"]);

  return majorData;
}

function seriesBreakdown(seriesObj) {
  const connector = seriesObj.conjunction;
  let series = [];

  if (seriesObj.courses) {
    const coursesInSeries = seriesObj.courses;

    coursesInSeries.forEach((course) => {
      const { prefix, courseNumber, courseTitle } = course;

      series.push({ prefix, courseNumber, courseTitle });
    });

    return conjoin(series, connector);
  }
}

function getLowerDivs(articulationData) {
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
              const series = seriesBreakdown(cell.series);

              classList.push(series);
            }
          });
        });
      });
    }
  });

  classList = alphaSort(classList, ["prefix", "courseNumber"]);

  return classList;
}

module.exports = {
  getCommunityColleges,
  getFourYears,
  getMajorData,
  seriesBreakdown,
  getLowerDivs,
  getCollegeName,
};
