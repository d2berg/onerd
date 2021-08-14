import { nanoid } from 'nanoid'
import { IClass } from './IClass';
import { ICourse } from "./ICourse";

export const newCourse = (number:number) : ICourse => ({
  id: nanoid(),
  number,
  controls: []
});

export const newClass = () : IClass => ({
  id: nanoid(),
  name: 'Class name',
});