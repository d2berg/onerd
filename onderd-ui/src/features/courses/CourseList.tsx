import React, { useContext } from 'react';
import { Table, Thead, Tr, Th, Td, Tbody, Tfoot, Button } from '@chakra-ui/react';
import CourseRow from './CourseRow';
import { ICourse } from '../../models/ICourse';
import { Context } from '../../store/Store';
import { ActionType } from '../../models/IAction';
import { newCourse } from '../../models/initializer';
const Courses = () => {

  const { state, dispatch } = useContext(Context);

  return <Table variant="simple" size="sm">
    <Thead>
      <Tr>
        <Th />
        <Th>Course nr</Th>
        <Th>Controls</Th>
        <Th></Th>
      </Tr>
    </Thead>
    <Tbody>
      {
        state.courses.map((course: ICourse) => <CourseRow
          course={course}
          onSubmit={() => alert('update')}
        />)
      }
    </Tbody>
    <Tfoot>
      <Tr>
        <Td>
          <Button onClick={() => {
            dispatch({ type: ActionType.ADD_COURSE, payload: newCourse(state.courses.length+1) })
          }}>New</Button>
        </Td>
      </Tr>
    </Tfoot>
  </Table>
}

export default Courses;