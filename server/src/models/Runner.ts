import { CardReading } from "./CardReading.js";
import Class from "./Class.js";
import { RunnerState } from "./RunnerState.js";
import { TimeInfo } from "./TimeInfo.js";

export interface IRunner {
  givenName: string;
  familyName: string;
  birthDay: Date;
  ecardId?: number;
  ecard?: CardReading;
  class?: Class;
  state: RunnerState;
  timeInfo: TimeInfo;
}

export default class Runner implements IRunner {
  givenName: string = "No Name";
  familyName: string = "No Name";
  birthDay: Date = new Date();
  ecardId?: number;
  ecard?: CardReading;
  class?: Class;
  state: RunnerState = RunnerState.Registered;
  timeInfo: TimeInfo = {
    startTime: new Date(),
    endTime: new Date(),
  };
  constructor(ir: IRunner) {
    this.birthDay = ir.birthDay;
    this.class = ir.class;
    this.ecard = ir.ecard;
    this.ecardId = ir.ecardId;
    this.familyName = ir.familyName;
    this.givenName = ir.givenName;
    this.state = ir.state;
    this.timeInfo = ir.timeInfo;
  }

  addCardReading(card: CardReading) {
    this.ecard = card;
  }
}
