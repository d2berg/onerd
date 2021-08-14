import React from 'react';
import { Table, Thead, Tr, Th, Td, Tbody, Tfoot } from '@chakra-ui/react';
const Runners = () => <Table variant="simple" size="sm">
  <Thead>
    <Tr>
      <Th>Family Name</Th>
      <Th>Given Name</Th>
      <Th isNumeric>Time</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>inches</Td>
      <Td>millimetres (mm)</Td>
      <Td isNumeric>25.4</Td>
    </Tr>
    <Tr>
      <Td>feet</Td>
      <Td>centimetres (cm)</Td>
      <Td isNumeric>30.48</Td>
    </Tr>
    <Tr>
      <Td>yards</Td>
      <Td>metres (m)</Td>
      <Td isNumeric>0.91444</Td>
    </Tr>
  </Tbody>
  <Tfoot>
    <Tr>
      <Th>To convert</Th>
      <Th>into</Th>
      <Th isNumeric>multiply by</Th>
    </Tr>
  </Tfoot>
</Table>

export default Runners;