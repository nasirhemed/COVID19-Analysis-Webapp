import React from "react";
import { Tabs as MuiTabs, Tab as MuiTab } from "@material-ui/core";

interface Props {
  handleClick: (value: number) => void;
  tabs: string[];
  value: number;
}

const Tabs: React.FC<Props> = props => {
  const { handleClick, tabs, value } = props;

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    handleClick(newValue);
  };

  return (
    <MuiTabs
      value={value}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleChange}
      aria-label="disabled tabs example"
    >
      {tabs.map(tabName => 
        <MuiTab label={tabName} />
      )}
    </MuiTabs>
  );
};

export default Tabs