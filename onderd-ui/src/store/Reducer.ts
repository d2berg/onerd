import Courses from "../features/courses/CourseList";
import { ActionType, IAction } from "../models/IAction";
import { IRace } from "../models/IRace";

const Reducer = (state: IRace, action: IAction) => {
  switch (action.type) {
    case ActionType.ADD_COURSE:
      return {
        ...state,
        courses: state.courses.concat(action.payload),
      };
    case ActionType.REMOVE_COURSE:
      return {
        ...state,
        courses: state.courses.filter((course) => course.id !== action.payload),
      };
    case ActionType.ADD_CLASS:
      return {
        ...state,
        classes: state.classes.concat(action.payload),
      };
    case ActionType.UPDATE_CLASS:
      return {
        ...state,
        classes: state.classes.map((c, index) => {
          if (index === action.payload.index) {
            return action.payload.class;
          }
          return c;
        }),
      };
    case ActionType.REMOVE_CLASS:
      return {
        ...state,
        classes: state.classes.filter((s) => s.id !== action.payload),
      };
    case ActionType.UPDATE_CONTROLS:
      return {
        ...state,
        courses: state.courses.map((c) => {
          if(c.id === action.payload.id){
            return {
              ...c,
              controls: action.payload.controls
            }
          }
          return c;
        })
      }
    default:
      return state;
  }
};

export default Reducer;
