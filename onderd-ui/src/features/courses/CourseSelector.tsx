import React, { useContext } from 'react';
import { Select } from "@chakra-ui/react"
import { Context } from '../../store/Store';
import { ICourse } from '../../models/ICourse';


// type CourseRowProps = {
//   course: ICourse,
//   onSubmit: (nextValue: IClass) => void
// };

const CourseSelector = () => {
  const { state, dispatch } = useContext(Context);

  return <Select placeholder="Select course" size="sm">
    {state.courses.map((course: ICourse) => <option
      value={course.id}
    >
      {course.number}
    </option>)}
  </Select>
}

export default CourseSelector;