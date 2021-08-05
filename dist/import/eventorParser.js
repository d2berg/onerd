import { RunnerState } from "../models/RunnerState";
const parseRunners = (personEntries) => {
    const runners = personEntries.map((pe) => {
        const runner = {
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
export const parseRace = (raceJson) => {
    const race = {
        name: raceJson.EntryList.Event.Name,
        runners: parseRunners(raceJson.EntryList.PersonEntry),
        classes: [],
        courses: []
    };
    return race;
};
