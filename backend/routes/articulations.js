/* eslint-disable no-undef */

// berkeley eecs major key: 9df99d8d-2540-4677-891f-a559d4801840
// year: 74, sending: 113, receiving: 79

const express = require("express");
const bodyParser = require("body-parser");

const { getArticulationData } = require("../public/articulationTools.js");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// below function will be replaced by post route
router.get("/:year/:sending/:receiving/:key", async (req, res) => {
  const year = req.params.year;
  const sending = req.params.sending;
  const receiving = req.params.receiving;
  const key = req.params.key;

  // below func. takes in arrays

  // append objects to the array that contain year, sending, receiving, key

  const articulationData = await getArticulationData([
    { year, sending, receiving, key },
    {
      year: "74",
      sending: "6",
      receiving: "120",
      key: "834d7251-be14-4ba7-bb22-d232d96395c6",
    },
  ]);

  res.status(200).json(articulationData);
});

router.post("/articulation-params", async (req, res) => {
  try {
    const parameters = req.body.parameters;

    console.log(parameters);

    // res.status(200).json(parameters);
  } catch (error) {
    res.send(`Error: no articulation params (${error})`);
  }

  //execute getArticulationData with the params from the req
});

module.exports = router;
