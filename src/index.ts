import {
  EcardMtr,
  Mtr4TransformStream,
  MtrStatusMessage,
  PackageType,
  serialOptionsMtr4,
} from "./mtr4/index.js";
import { getStatusCommand } from "./mtr4/mtr4-commands.js";

import { Readable } from "stream";

// const fs = require('fs');
// const xml2js = require('xml2js');

import SerialPort from "serialport";
// const port = new SerialPort('/dev/tty-usbserial1', {
//   baudRate: 57600
// })

// const parser = new xml2js.Parser();
// fs.readFile(__dirname + '/../test.xml', function(err:any, data:any) {
//     parser.parseString(data, function (err:any, result:any) {
//         console.dir(result);
//         fs.writeFileSync('race.json', JSON.stringify(result), 'utf8');
//         console.log('Done');
//     });
// });

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
list();
