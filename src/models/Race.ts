import Class from "./Class";
import Runner from "./Runner";
import Course from "./Course";

export default class Race {
  name: string = "No Name";
  classes: Class[] = [];
  courses: Course[] = [];
  runners: Runner[] = [];
  constructor(){
  }
}