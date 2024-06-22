/* eslint-disable no-undef */
const express = require("express");

const router = express.Router();

router.get("/communityColleges", (req, res) => {
  res.send("Will send JSON from getReceivingSchools()");
});

router.get("/four-years", (req, res) => {
  res.send("Will send JSON from getSendingSchools()");
});

router.get("/major-data/:receiving/:sending/:year", (req, res) => {
  res.send("Will send JSON from getMajorData()");
});

module.exports = router;

/*

import { alphaSort, jsonFromServer } from "./utilities.js";

export function getMajorData(receiving, sending, year) {
  const majorKeysByUni = `https://assist.org/api/agreements?receivingInstitutionId=${receiving}&sendingInstitutionId=${sending}&academicYearId=${year}&categoryCode=major`;

  const json = jsonFromServer(majorKeysByUni);
  const majors = Object.values(json); // array

  const majorData = [];

  majors[0].forEach((dataset) => {
    const major = dataset.label;
    const keyStr = dataset.key;
    const key = keyStr.split("/").pop();

    majorData.push({ major, key });
  });

  return alphaSort(majorData, "major");
}

export async function getSendingSchools() {
  const json = await fetch("http://localhost:80/schoolList", {mode: "cors"});
  const schoolData = Object.values(json); // array

  const schoolList = [];

  schoolData.forEach((school) => {
    if (school.isCommunityCollege) {
      const nameList = school.names;
      const { name } = nameList[nameList.length - 1];
      const { id } = school;

      schoolList.push({ name, id });
    }
  });

  return alphaSort(schoolList, "name");
}

export function getReceivingSchools() {
  const institutions = "https://assist.org/api/institutions";

  const json = jsonFromServer(institutions);
  const schoolData = Object.values(json); // array

  const schoolList = [];

  schoolData.forEach((school) => {
    if (!school.isCommunityCollege) {
      const nameList = school.names;
      const { name } = nameList[nameList.length - 1];
      const { id } = school;

      schoolList.push({ name, id });
    }
  });

  return alphaSort(schoolList, "name");
}

*/
