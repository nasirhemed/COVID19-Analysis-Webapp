import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Navbar: React.FC = props => {

    return <AppBar color='default' position="static">
    <Toolbar>
      <Typography variant="h6">
        COVID-19 Analysis
      </Typography>
    </Toolbar>
  </AppBar>
}

export default Navbar