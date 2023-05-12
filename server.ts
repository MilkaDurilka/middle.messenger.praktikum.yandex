import type { Response, Request } from "express-serve-static-core";

const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.static("./dist"));

app.get("*", (_: Request, res: Response) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
