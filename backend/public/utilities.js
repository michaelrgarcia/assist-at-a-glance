/* eslint-disable no-undef */

const _ = require("lodash");
const puppeteer = require("puppeteer");

async function getJson(link) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(link);

  const pre = await page.$eval("pre", (element) => element.textContent);
  const parsedPre = JSON.parse(pre);

  await browser.close();

  return parsedPre;
}

function alphaSort(array, str) {
  let arr = array;
  arr = _.orderBy(arr, [str], ["asc"]);

  return arr;
}

function deNest(data) {
  const json = JSON.parse(data);
  const processed = Object.values(json);

  return processed;
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
