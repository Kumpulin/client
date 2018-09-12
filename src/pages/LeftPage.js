import React from 'react'
import { Route } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

import AboutUs from '../sections/AboutUs'
import Team from '../sections/Team'
import Home from '../sections/Home'

const Page = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Route path="/team" component={Team}/>
        <Route path="/about-us" component={AboutUs}/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Home />
      </Grid>
    </Grid>
  )
}

export default Page
