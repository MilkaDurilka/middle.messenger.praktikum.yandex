const express = require("express");
const historyApi = require("express-history-api-fallback");

const app = express();
const PORT = 3000;

app.use(express.static("./dist"));

app.use(historyApi("index.html", { root: "./dist" }));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
