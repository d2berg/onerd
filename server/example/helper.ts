// import {
//   Mtr4TransformStream,
//   serialOptionsMtr4,
//   EcardMtr,
//   MtrStatusMessage,
//   PackageType,
// } from "../src/mtr4";
// import { SerialPort, SerialOptions } from "./serial-types";
// import { getStatusCommand } from "../src/mtr4/mtr4-commands";


// let portMtr4: SerialPort | null = null;
// let inputDoneMtr4: Promise<void> | null = null;
// let readerMtr4: ReadableStreamReader<EcardMtr | MtrStatusMessage> | null = null;


// export const connectMtr4 = async () => {
//   try {
//     portMtr4 = await navigator.serial.requestPort({
//       /* filters: [
//           {
//             vendorId: 0x0403, // FTDI
//             productId: 0x6001,
//           },
//         ],*/
//     });

//     console.log("MTR4 port acquired", portMtr4);

//     await portMtr4.open(<SerialOptions>serialOptionsMtr4);

//     let emitTransformer = new Mtr4TransformStream();
//     inputDoneMtr4 = portMtr4.readable.pipeTo(emitTransformer.writable);
//     readerMtr4 = emitTransformer.readable.getReader();

//     let ts = new TransformStream();
//     ts.readable.pipeTo(portMtr4.writable);
//     let writer = ts.writable.getWriter();
//     writer.write(getStatusCommand());
//     writer.releaseLock();

//     while (true) {
//       const { value, done } = await readerMtr4.read();

//       if (done) {
//         console.log("[readLoop] DONE", done);
//         break;
//       }

//       if (value) {
//         console.log("MTR4 value", value);
//         if (value.packageType === PackageType.EcardMtr) {
//           appendCardToList(value);
//         }
//       }
//     }

//     readerMtr4.releaseLock();
//   } catch (e) {
//     console.error("MTR4 serial", e);
//     // Permission to access a device was denied implicitly or explicitly by the user.
//   }
// };

// /**
//  * Credits to the web-serial Codelab: https://codelabs.developers.google.com/codelabs/web-serial/#0
//  */
// export const disconnectMtr4 = async () => {
//   if (readerMtr4 && inputDoneMtr4 && portMtr4) {
//     await readerMtr4.cancel();
//     await inputDoneMtr4.catch(() => {});
//     readerMtr4 = null;
//     inputDoneMtr4 = null;

//     await portMtr4?.close();
//     portMtr4 = null;
   
//   } else {
//     console.error(
//       "something is not defined when disconnecting MTR4 (reader/inputDone/port)",
//       readerMtr4,
//       inputDoneMtr4,
//       portMtr4,
//     );
//   }
// };

// const appendCardToList = (ecard: EcardMtr) => {
//   const cardId = document.createElement("td");
//   cardId.innerText = ecard.ecardNumber + "";
//   const cardYear = document.createElement("td");
//   cardYear.innerText = ecard.ecardProductionYear + "";
//   const cardWeek = document.createElement("td");
//   cardWeek.innerText = ecard.ecardProductionWeek + "";

//   const cardRow = document.createElement("tr");
//   cardRow.append(cardId, cardYear, cardWeek);

//   ecard.controlCodes.forEach(({ code }) => {
//     const control = document.createElement("td");
//     control.innerText = code + "";
//     cardRow.append(control);
//   });

//   const tableBody = document.getElementById("emit-card-list-body");
//   tableBody?.prepend(cardRow);
// };


// export function concatArrayBuffers(buffers: ArrayBuffer[]) {
//   let offset = 0;
//   let bytes = 0;
//   buffers.forEach(function (buffer) {
//     bytes += buffer.byteLength;
//   });

//   const mergedBuffer = new ArrayBuffer(bytes);
//   const store = new Uint8Array(mergedBuffer);
//   buffers.forEach(function (buffer) {
//     store.set(new Uint8Array(buffer), offset);
//     offset += buffer.byteLength;
//   });
//   return mergedBuffer;
// }

// window.connectMtr4 = connectMtr4;
// window.disconnectMtr4 = disconnectMtr4;
