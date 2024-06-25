/* eslint-disable no-undef */

const express = require("express");
const { getJson, alphaSort } = require("../public/utilities.js");

const router = express.Router();

router.get("/communityColleges", async (req, res) => {
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

  schoolList = alphaSort(schoolList, "name");

  res.json(schoolList);
});

router.get("/four-years", async (req, res) => {
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

  schoolList = alphaSort(schoolList, "name");

  res.json(schoolList);
});

router.get("/major-data/:receiving/:sending/:year", async (req, res) => {
  const receiving = req.params.receiving;
  const sending = req.params.sending;
  const year = req.params.year;

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

  majorData = alphaSort(majorData, "major");

  res.json(majorData);
});

module.exports = router;
