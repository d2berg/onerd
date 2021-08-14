export enum ActionType {
  ADD_COURSE = 'ADD_COURSE',
  REMOVE_COURSE = 'REMOVE_COURSE',
  ADD_CLASS = 'ADD_CLASS',
  REMOVE_CLASS = 'REMOVE_CLASS',
  UPDATE_CLASS = 'UPDATE_CLASS',
  UPDATE_CONTROLS = 'UPDATE_CONTROLS',
}

export interface IAction {
  type: ActionType;
  payload: any;
}