/* eslint-disable no-undef */

const _ = require("lodash");
const puppeteer = require("puppeteer");

const browser = (async function () {
  return await puppeteer.launch({ headless: true });
})();

async function getJson(link) {
  const page = await browser.newPage();

  page.goto(link);

  const pre = await page.$eval("pre", (element) => element.textContent);
  const parsedPre = JSON.parse(pre);

  await page.close();

  return parsedPre;
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
