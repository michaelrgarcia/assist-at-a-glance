import express from "express";

const router = express.Router();

router.get("/communityColleges", (req, res) => {
  res.send("Will send JSON from getReceivingSchools()");
});

router.get("/four-years", (req, res) => {
  res.send("Will send JSON from getSendingSchools()");
});
