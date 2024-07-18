/* eslint-disable no-undef */

// berkeley eecs major key: 9df99d8d-2540-4677-891f-a559d4801840
// year: 74, sending: 113, receiving: 79

const express = require("express");
const { getChunkArticulationData } = require("../public/articulationTools.js");

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.post("/articulation-data", async (req, res) => {
  try {
    const links = req.body;

    const lambdaEndpoint =
      "https://rex5t1umok.execute-api.us-east-2.amazonaws.com/default/assist-cluster-scraper";

    const chunk = await fetch(lambdaEndpoint, {
      method: "POST",
      body: links,
      headers: { "Content-Type": "application/json" },
    });

    const instData = getChunkArticulationData(chunk);

    res.status(200).json(instData);
  } catch {
    res.status(500).json({ error: "Invalid data input" });
  }
});

module.exports = router;
