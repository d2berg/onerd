export interface IControl {
  number: number,
  code: number
};
export interface ICourse {
  id: string;
  number: number;
  controls: IControl[];
}