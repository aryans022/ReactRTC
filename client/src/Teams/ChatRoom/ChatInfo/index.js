import React from 'react';

import { Grid, Button } from '@material-ui/core';
import useStyles from './ChatInfoStyles.js'
import GroupIcon from '@material-ui/icons/Group';

const ChatInfo = (props) => {

  const { name, code, inRoom, setTeam } = props;
  const { innerWidth: width } = window;

  const classes = useStyles();

  return (
    <Grid
      container
      direction='row'
      alignItems='center'
      className={classes.root}
    >
      {/*show the name if it is defined*/}
      {name ?
        <Grid
          item
          className={classes.teamName}
        >
          {name}
        </Grid>
        :
        null
      }

      {/*team code*/}
      <Grid item >
        Code: {code}
      </Grid>

      {/*show the display teams button on small screens when not in video room*/}
      <Grid item className={classes.buttonHolder}>
        {(width < 600 && !inRoom) ? <Button
          color='primary'
          variant='contained'
          onClick={() => setTeam(true)}
          className={classes.teamButton}
        >
          <GroupIcon className={classes.icon} />
        </Button> : null}
      </Grid>

    </Grid>
  )
}

export default ChatInfo;