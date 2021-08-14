import {
  EcardMtr,
  Mtr4TransformStream,
  MtrStatusMessage,
  PackageType,
  serialOptionsMtr4,
} from "./mtr4/index.js";
import { getStatusCommand } from "./mtr4/mtr4-commands.js";

import { Readable } from "stream";

import { startServer } from "./api/api.js";

// const fs = require('fs');
// const xml2js = require('xml2js');

import SerialPort from "serialport";
import { getClasses, getEntries } from "./import/eventor.js";
import Runner, { IRunner } from "./models/Runner.js";
import Race from "./models/Race.js";
import { load, save } from "./database/file.js";
// const port = new SerialPort('/dev/tty-usbserial1', {
//   baudRate: 57600
// })


startServer();

console.log("running"); 

const list = async () => {
  const meta = await SerialPort.list();
  const { path } = meta.find(
    (m: any) => m.manufacturer === "FTDI" && m.productId === "6001"
  );
  console.log(path);

  const port = new SerialPort(path, serialOptionsMtr4);
  let inputDoneMtr4: Promise<void> | null = null;

  let emitTransformer = new Mtr4TransformStream();
  emitTransformer.addEcardListener((ecard) => {
    console.log(ecard);
  })
  inputDoneMtr4 = port.pipe(emitTransformer);

  // setTimeout(() => {
  //   port.write(getStatusCommand());
  // }, 2000);

  // while (true) {
  //   const data = await port.read();
  //   if (data) {
  //     console.log("reading", data);
  //   }
  //   // if (done) {
  //   //   console.log("[readLoop] DONE", done);
  //   //   break;
  //   // }

  //   // if (value) {
  //   //   console.log("MTR4 value", value);
  //   //   if (value.packageType === PackageType.EcardMtr) {
  //   //     //appendCardToList(value);
  //   //     console.log(value);
  //   //   }
  //   // }
  // }

  // readerMtr4.releaseLock();

  console.log(meta);
};

// list();

const fetchEventor = async () => {
  const runners = await getEntries();
 runners.forEach((r: Runner) => {
    console.log(r.givenName, r.class, r.ecard);
    // console.log(entry.EntryClass.EventClassId);
  });
  const classes = await getClasses();
  console.log(classes);
  const race = new Race();
  race.runners = runners.map((ir: IRunner) => new Runner(ir));
  race.classes = classes;

  save(race);
}

const race = load();
console.log(race);

// fetchEventor();
// list();