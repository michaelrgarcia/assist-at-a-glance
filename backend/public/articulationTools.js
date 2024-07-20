/* eslint-disable no-undef */

const { getJson } = require("./utilities.js");

async function getRawArticulationData(year, sending, receiving, key) {
  const articulationPage = `https://assist.org/api/articulation/Agreements?Key=${year}/${sending}/to/${receiving}/Major/${key}`;

  const json = await getJson(articulationPage);
  const articulationData = Object.values(json)[0];

  return articulationData;
}

module.exports = {
  getRawArticulationData,
};
