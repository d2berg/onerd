import { Flex, Heading, Tab, TabList, Tabs } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => <Flex bg="gray.700" color="gray.100">
  <Heading>0n3rd</Heading>
  <Tabs>
    <TabList>
      <Tab> <Link to="/">Race</Link></Tab>
      <Tab> <Link to="/organisation">Organisation</Link></Tab>
    </TabList>
  </Tabs>
</Flex>

export default Header;