import { Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import ClassList from "../features/classes/ClassList";
import Configuration from "../features/configuration/Configuration";
import CourseList from "../features/courses/CourseList";
import Runners from "../features/Runners";
import Header from "../Header";

const Race = () => <Grid templateRows="2">
  <GridItem>
    <Tabs isLazy>
      <TabList>
        <Tab>Configuration</Tab>
        <Tab>Runners</Tab>
        <Tab>Classes</Tab>
        <Tab>Courses</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Configuration />
        </TabPanel>
        <TabPanel>
          <Runners />
        </TabPanel>
        <TabPanel>
          <ClassList />
        </TabPanel>
        <TabPanel>
          <CourseList />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </GridItem>
</Grid>

export default Race;