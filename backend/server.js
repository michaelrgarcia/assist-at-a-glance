import express from "express";

const app = express();
const port = 10000;

app.use(express.static("../frontend/dist/"));

/*  

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

*/

app.listen(port);
