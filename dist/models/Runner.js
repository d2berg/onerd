import { RunnerState } from "./RunnerState";
export default class Runner {
    constructor() {
        this.givenName = "No Name";
        this.familyName = "No Name";
        this.birthDay = new Date();
        this.state = RunnerState.Registered;
        this.timeInfo = {
            startTime: new Date(),
            endTime: new Date(),
        };
    }
}
