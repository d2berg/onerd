import xml2js from "xml2js";
import fs from "fs";
import axios, { AxiosResponse } from "axios";
import { parseClasses, parseEntryList, parseRunners } from "./eventorParser.js";
import { IRunner } from "../models/Runner.js";
import Class from "../models/Class.js";

const apiKey = "";

export const parseXml = () => {
  const parser = new xml2js.Parser();
  fs.readFile(__dirname + "/../test.xml", function (err: any, data: any) {
    parser.parseString(data, function (err: any, result: any) {
      console.dir(result);
      fs.writeFileSync("race.json", JSON.stringify(result), "utf8");
      console.log("Done");
    });
  });
};

export const getEntries = async (): Promise<IRunner[]> => {
  console.log("getting entries");
  const eventId = 14834;
  const parser = new xml2js.Parser();
  const axiosResponse: AxiosResponse | void = await axios
    .get(
      "https://eventor.orientering.no/api/entries"
        .concat(`?eventIds=${eventId}`)
        .concat("&includePersonElement=true")
        .concat("&includeOrganisationElement=true"),
      {
        headers: {
          ApiKey: apiKey,
        },
      }
    )
    .catch((err) => {
      console.log(err);
    });
  if (axiosResponse) {
    const json = await parser
      .parseStringPromise(axiosResponse.data)
      .catch((err) => console.error(err));
    return parseRunners(json.EntryList.Entry);
  }
};

export const getClasses = async (): Promise<Class[]> => {
  console.log("getting classes");
  const eventId = 14834;
  const parser = new xml2js.Parser();
  const axiosResponse: AxiosResponse | void = await axios
    .get(
      "https://eventor.orientering.no/api/eventclasses"
        .concat(`?eventId=${eventId}`)
        .concat("&includeEntryFees=true"),
      {
        headers: {
          ApiKey: "61b2a9f486184925a8f6f9f1ff3ff769",
        },
      }
    )
    .catch((err) => {
      console.log(err);
    });
  if (axiosResponse) {
    const json = await parser
      .parseStringPromise(axiosResponse.data)
      .catch((err) => console.error(err));
    return parseClasses(json);
  }
};

export const toXml = (obj) => {
  const builder = new xml2js.Builder();
  const xml = builder.buildObject(obj);
};
