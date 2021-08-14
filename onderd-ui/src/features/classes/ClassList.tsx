import React, { useContext } from 'react';
import { Context } from '../../store/Store';

import { Table, Thead, Tr, Th, Td, Tbody, Tfoot, Button } from '@chakra-ui/react';
import { IClass } from '../../models/IClass';
import { ActionType } from '../../models/IAction';
import ClassRow from './ClassRow';
import { newClass } from '../../models/initializer';
const Classes = () => {
  const { state, dispatch } = useContext(Context);
  //   useEffect(() => {
  //     axios.get('/posts.json')
  //         .then(response => {
  //             const postsData = response.data;
  //             dispatch({type: 'SET_POSTS', payload: postsData});
  //         })
  //         .catch(error => {
  //             dispatch({type: 'SET_ERROR', payload: error});
  //         });
  // }, []);
  return <>
    <Table variant="simple" size="sm">
      <Thead>
        <Tr>
          <Th>
            <Button size="sm" onClick={() => {
              dispatch({ type: ActionType.ADD_CLASS, payload: newClass() })
            }}>New</Button>
          </Th>
          <Th colSpan={3}></Th>
        </Tr>
        <Tr>
          <Th>Class name</Th>
          <Th>Course</Th>
          <Th colSpan={2}></Th>
        </Tr>
      </Thead>
      <Tbody>
        {state.classes.map((c: IClass, index: number) => <ClassRow
          key={index}
          c={c}
          onSubmit={(newClass) => {
            dispatch({ type: ActionType.UPDATE_CLASS, payload: { index, class: newClass } })
          }}
        />)
        }
      </Tbody>
      <Tfoot>
        <Tr>
          <Td>
            <Button size="sm" onClick={() => {
              dispatch({ type: ActionType.ADD_CLASS, payload: newClass() })
            }}>New</Button>
          </Td>
        </Tr>
      </Tfoot>
    </Table>
  </>
}

export default Classes;