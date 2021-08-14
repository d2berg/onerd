import express from "express";

import { organisation } from "./organisation.js";
import { race } from "./race.js";

export const startServer = () => {
  const app = express();
  const port = 3000;
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

  app.use("/organisation", organisation);
  app.use("/race", race);
};
