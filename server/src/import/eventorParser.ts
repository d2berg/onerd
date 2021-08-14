import Class from "../models/Class.js";
import Race from "../models/Race.js";
import Runner, { IRunner } from "../models/Runner.js";
import { RunnerState } from "../models/RunnerState.js";

export const parseClasses = (json: any): Class[] => {
  const classes = json.EventClassList.EventClass.map((ec) => {
    const c: Class = {
      name: ec.Name[0],
      id: ec.EventClassId[0],
    };
    return c;
  });
  return classes;
};

export const parseRunners = (personEntries: any): IRunner[] => {
  const runners: IRunner[] = personEntries.map((pe: any) => {
    try {
      // console.log(pe.Competitor[0].Person[0].PersonName[0]);
      const runner: IRunner = {
        givenName: pe.Competitor[0].Person[0].PersonName[0].Given[0]._,
        familyName: pe.Competitor[0].Person[0].PersonName[0].Family[0],
        birthDay: pe.Competitor[0].Person[0].BirthDate[0],
        ecardId: pe.Competitor[0].CCard
          ? pe.Competitor[0].CCard[0].CCardId[0]
          : null,
        state: RunnerState.Registered,
        timeInfo: {
          startTime: new Date(),
          endTime: new Date(),
        },
        class: {
          id: pe.EntryClass[0].EventClassId[0],
        },
      };
      return runner;
    } catch (err) {
      console.log(pe.Competitor[0]);
      throw err;
    }
  });
  return runners;
};

export const parseEntryList = (raceJson: any): Race => {
  const race: Race = {
    name: raceJson.EntryList.Event.Name,
    runners: parseRunners(raceJson.EntryList.PersonEntry).map((ir:IRunner) => new Runner(ir)),
    classes: [],
    courses: [],
  };
  return race;
};
