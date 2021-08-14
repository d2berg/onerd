import { ICourse } from "./ICourse";

export interface IClass {
  id: string;
  name: string;
  course?: ICourse;
}