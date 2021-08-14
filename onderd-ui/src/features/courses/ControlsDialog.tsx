import { Button, Table, Tr, Td, Th, Tbody, Thead, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React, { useState } from 'react';
import { IControl } from '../../models/ICourse';
import ControlElement from './ControlElement';

export interface ControlsDialogProps {
  controls: IControl[];
  onSubmit: (controls: IControl[]) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ControlsDialog = ({ isOpen, onClose, onSubmit, controls }: ControlsDialogProps) => {
  const [tempControls, setTempControls] = useState(controls);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Controls</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Number</Th>
                  <Th>Code</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {tempControls.map((tc: IControl, index: number) => <ControlElement
                  c={tc}
                  number={index + 1}
                  onUpdate={(newControl: IControl) => {
                    const cc = tempControls;
                    cc[index] = newControl;
                    setTempControls(cc);
                  }}
                  onRemove={() => alert('Ttodo')}
                />)}
              </Tbody>
            </Table>
            <Button onClick={() => {
              const cc = tempControls;
              cc.push({ number: 0, code: 0 });
              setTempControls([...cc]);
            }}
            >Add</Button>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => onSubmit(tempControls)}>
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};

export default ControlsDialog;