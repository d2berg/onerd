import express from "express";
const api = express.Router();
api.get("/", (req, res) => {
  res.send('Organisation what');
});

export { api as organisation };
