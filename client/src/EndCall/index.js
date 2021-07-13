import React from 'react';
import { Typography, Button, Grid } from '@material-ui/core';
import useStyles from './endCallStyles';

export default function EndCall() {

  const classes = useStyles();

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      className={classes.holder}
    >
      <center>

        <Typography 
        className = {classes.message}
        variant='h5' 
        >
          You left the meeting
        </Typography>

        <a href = '/teams' className={classes.link}>
          <Button
          className = {classes.homeButton}
          variant='contained' 
          color='primary'
          > 
            Return to Teams Chat
          </Button>
        </a>
        
      </center>
    </Grid>
  );
}