import Class from "./Class";
import { RunnerState } from "./RunnerState";
import { TimeInfo } from "./TimeInfo";

export default class Runner {
  givenName: string = "No Name";
  familyName: string = "No Name";
  birthDay: Date = new Date();
  ecard?: number;
  class?: Class;
  state: RunnerState = RunnerState.Registered;
  timeInfo: TimeInfo = {
    startTime: new Date(),
    endTime: new Date(),
  };
  constructor() {}
}
