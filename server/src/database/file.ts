import { readFileSync, writeFileSync } from "fs";
import Race from "../models/Race.js";

export const save = async (race: Race) => {
  const json = JSON.stringify(race);
  writeFileSync('./race.json', json, 'utf-8');
}

export const load = () => {
  const file = readFileSync('./race.json', 'utf-8');
  return JSON.parse(file);
}