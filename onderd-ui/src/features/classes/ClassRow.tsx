import { Editable, EditableInput, EditablePreview, Td, Tr, IconButton } from "@chakra-ui/react"
import { useContext, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { ActionType } from "../../models/IAction";
import { IClass } from "../../models/IClass";
import { Context } from "../../store/Store";
import CourseSelector from "../courses/CourseSelector";

type ClassRowProps = {
  c: IClass,
  onSubmit: (nextValue: IClass) => void
};

const ClassRow = ({ c, onSubmit }: ClassRowProps) => {
  const { state, dispatch } = useContext(Context);
  const [tempName, setTempName] = useState(c.name);
  return <Tr>
    <Td>
      <Editable size="sm" value={tempName} onChange={(val) => {
        setTempName(val);
      }}
        onSubmit={() => {
          onSubmit({ ...c, name: tempName })
        }
        }
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
    </Td>
    <Td>{c.course?.id}</Td>
    <Td>
      <CourseSelector />
    </Td>
    <Td><IconButton
      size="sm"
      aria-label="Delete class"
      onClick={() => dispatch({ type: ActionType.REMOVE_CLASS, payload: c.id })}
      icon={<BsTrash />} />
    </Td>
  </Tr>
}

export default ClassRow;