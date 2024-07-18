/* eslint-disable no-undef */

const _ = require("lodash");
const puppeteer = require("puppeteer");

async function getJson(link) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(link, { waitUntil: "networkidle2", timeout: 30000 });

  const parsedPre = await page.evaluate(() => {
    const pre = document.querySelector("pre");
    return pre ? JSON.parse(pre.textContent) : null;
  });

  await browser.close();

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
