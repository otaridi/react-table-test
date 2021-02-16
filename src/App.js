import React from "react";
import './App.css';
import BasicTable from "./components/BasicTable";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import GroupedTable from "./components/GroupedTable";


function App() {
    return (
      <div className="main-container">
        <Tabs forceRenderTabPanel={true}>
          <TabList>
            <Tab >Data</Tab>
            <Tab>Grouped Data</Tab>
          </TabList>
          <TabPanel>
            <BasicTable />
          </TabPanel>
          <TabPanel>
            <GroupedTable />
          </TabPanel>
        </Tabs>
      </div>
    );
}

export default App;
