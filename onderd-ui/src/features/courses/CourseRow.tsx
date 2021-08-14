import React, { useContext } from 'react';
import { Editable, EditableInput, EditablePreview, Td, Tr, IconButton, Input, Tag, Button } from "@chakra-ui/react"
import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { IClass } from "../../models/IClass";
import { ICourse } from "../../models/ICourse";
import { Context } from "../../store/Store";
import { ActionType } from '../../models/IAction';
import ControlsDialog from './ControlsDialog';

type CourseRowProps = {
  course: ICourse,
  onSubmit: (nextValue: IClass) => void
};

const CourseRow = ({ course, onSubmit }: CourseRowProps) => {
  const { state, dispatch } = useContext(Context);
  const [controlsOpen, setControlsOpen] = useState(false);

  return <Tr>
    <Td><Tag>{course.id}</Tag></Td>
    <Td>
      <Input value={course.number} size="sm" />
    </Td>
    <Td><Button onClick={() => setControlsOpen(!controlsOpen)}>Open controls</Button></Td>
    <Td><IconButton
      size="sm"
      aria-label="Delete class"
      icon={<BsTrash />}
      onClick={() => dispatch({ type: ActionType.REMOVE_COURSE, payload: course.id })}
    />
      <ControlsDialog
        controls={course.controls}
        onSubmit={(controls) => dispatch({
          type: ActionType.UPDATE_CONTROLS,
          payload: {
            id: course.id, controls
          }
        })
        }
        isOpen={controlsOpen}
        onClose={() => setControlsOpen(false)} />
    </Td>
  </Tr>
}

export default CourseRow;