import express from "express";

const app = express();
const port = 10000;

app.get("/", (req, res) => {
  console.log("yo");
  res.send("hello");
});

app.listen(port);
