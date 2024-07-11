/* eslint-disable no-undef */

// berkeley eecs major key: 9df99d8d-2540-4677-891f-a559d4801840
// year: 74, sending: 113, receiving: 79

const express = require("express");

const {
  getArticulationParams,
  getArticulationData,
} = require("../public/articulationTools.js");

const router = express.Router();

// consider making this a POST
// REALLY dont want ppl spamming this one
// receiving and major key easily accessible from front end form POST

// consider caching (maybe mongodb?)

router.get("/:receiving/:key/all-articulations", async (req, res) => {
  const receiving = req.params.receiving;
  const key = req.params.key;

  const articulationParams = await getArticulationParams(receiving, key);
  const baseArticulations = await getArticulationData(articulationParams);

  res.status(200).json(baseArticulations);
  // this data will be broken down on front end (need class obj)
});

module.exports = router;
