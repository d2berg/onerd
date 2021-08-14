import { Input, Td, Tr, IconButton, Tag } from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import { IControl } from "../../models/ICourse";

type ClassRowProps = {
  c: IControl,
  number: number,
  onUpdate: (nextValue: IControl) => void
  onRemove: () => void
};

const ControlElement = ({ c, onUpdate, onRemove, number }: ClassRowProps) => {
  return <Tr>
    <Td>
      <Tag>{number}</Tag>
    </Td>
    <Td>
      <Input size="xs" value={c.code} onChange={(e) => {
        onUpdate({
          ...c,
          number,
          code: Number(e.target.value)
        })
      }} />
    </Td>
    <Td>
      <IconButton
        size="xs"
        aria-label="Delete "
        icon={<BsTrash />}
        onClick={onRemove}
      />
    </Td>
  </Tr>
}

export default ControlElement;