import { BatterStatus, PackageType } from "../mtr4"

interface ControlCode {
  code: number;
  time: number;
}

export interface CardReading {
  packageSize: number;
  packageType: PackageType;
  mtrId: number;
  timestamp: Date;
  batteryStatus: BatterStatus;
  packageNumber: number;
  ecardNumber: number;
  ecardProductionWeek: number;
  ecardProductionYear: number;
  validEcardHeadCheckByte: boolean;
  controlCodes: ControlCode[];
  asciiString: string;
  validTransferCheckByte: boolean;
}