/* eslint-disable no-undef */

// berkeley eecs major key: 9df99d8d-2540-4677-891f-a559d4801840
// year: 74, sending: 113, receiving: 79

const express = require("express");
const {
  getArticulationData,
  createArticulationList,
} = require("../public/articulationTools.js");

const router = express.Router();

router.get("/:year/:sending/:receiving/:key", async (req, res) => {
  const year = req.params.year;
  const sending = req.params.sending;
  const receiving = req.params.receiving;
  const key = req.params.key;

  const articulationData = await getArticulationData(
    year,
    sending,
    receiving,
    key
  );

  const allArticulations = createArticulationList(articulationData);

  res.json(allArticulations);
});

module.exports = router;
