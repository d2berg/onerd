import Class from "./models/Class";
import Course from "./models/Course";
import Race from "./models/Race";
import Runner from "./models/Runner";

export default (): Race => {
  const course1: Course = new Course();
  const course2: Course = new Course();

  const classh21: Class = new Class();
  classh21.course = course1;

  const classd21: Class = new Class();
  classd21.course = course2;

  const runnerA = new Runner();
  runnerA.class = classh21;

  const runnerB = new Runner();
  runnerB.class = classh21;

  const runnerC = new Runner();
  runnerC.class = classd21;


  const race = new Race();
  race.runners = [runnerA, runnerB, runnerC];
  race.classes = [classh21, classd21];
  race.courses = [course1, course2];
  race.name = "Test race";

  return race;
};
