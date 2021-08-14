import { IClass } from "./IClass";
import { ICourse } from "./ICourse";

export interface IRace {
  name: string;
  courses: ICourse[]
  classes: IClass[]
};