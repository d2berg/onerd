import express from "express";
import { load } from "../database/file.js";
const api = express.Router();
api.get("/:id/", (req, res) => {
  const race = load();
  res.json(race);
});

export { api as race };
