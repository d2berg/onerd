import Race from "../models/Race";
import Runner from "../models/Runner";
import { RunnerState } from "../models/RunnerState";

const parseRunners = (personEntries: any): Runner[] => {
  const runners: Runner[] = personEntries.map((pe:any) => {
    const runner: Runner = {
      givenName: pe.Person.Name.Given,
      familyName: pe.Person.Name.Family,
      birthDay: pe.Person.BirthDate,
      ecard: pe.ControlCard._,
      state: RunnerState.Registered,
      timeInfo: {
        startTime: new Date(),
        endTime: new Date()
      }
    };
    return runner;
  });
  return runners;
};

export const parseRace = (raceJson: any): Race => {
  const race: Race = {
    name: raceJson.EntryList.Event.Name,
    runners: parseRunners(raceJson.EntryList.PersonEntry),
    classes: [],
    courses: []
  };
  return race;
};
