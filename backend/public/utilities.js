/* eslint-disable no-undef */

const _ = require("lodash");

async function getJson(link) {
  const response = await fetch(link);
  const json = await response.json();

  return json;
}

function alphaSort(array, array2) {
  let arr = array;
  arr = _.orderBy(arr, array2, ["asc"]);

  return arr;
}

function deNest(data) {
  const json = JSON.parse(data);

  if (json) {
    const processed = Object.values(json);

    return processed;
  }
}

function conjoin(array, conjunction) {
  let result = [];

  array.forEach((item, index) => {
    result.push(item);

    if (index < array.length - 1) {
      result.push(conjunction);
    }
  });

  return result;
}

module.exports = { getJson, alphaSort, deNest, conjoin };
