import React from 'react';
import { Grid, Select, MenuItem, Button } from '@material-ui/core';
import useStyles from './OptionsStyles';

export default function Options(props) {

  let {
    handleInputChange, handleAudioChange, handleVideoChange,
    audioInSelected, videoInSelected, audioOutSelected,
    audioIn, videoIn, audioOut, audio, video, handleJoin
  } = props

  const classes = useStyles();

  const getMenuItems = device => {
    return <MenuItem
      className={classes.menuLabel}
      value={device}
      key={device.deviceId}
    >
      {device.label}
    </MenuItem>
  }

  return (

    <Grid container direction='row' justify='center' alignItems='center' spacing={0} className={classes.root}>
      <Grid item align='center' xs={12}>

        {/*Audio menu*/}
        <Select
          value={audioInSelected}
          onChange={event => {
            audioInSelected = event.target.value;
            handleInputChange(audioInSelected, videoInSelected);
          }}
          className={classes.selectBox}
          MenuProps={{ classes: { paper: classes.selectMenu } }}
        >
          {
            audioIn.map(getMenuItems)
          }
        </Select>
      </Grid>

      {/*Video input menu*/}
      <Grid item align='center' xs={12}>
        <Select
          value={videoInSelected}
          onChange={event => {
            videoInSelected = event.target.value;
            handleInputChange(audioInSelected, videoInSelected);
          }}
          className={classes.selectBox}
          MenuProps={{ classes: { paper: classes.selectMenu } }}
        >
          {
            videoIn.map(getMenuItems)
          }
        </Select>
      </Grid>

      {/*audio output menu*/}
      <Grid item align='center' xs={12}>
        <Select
          value={audioOutSelected}
          onChange={event => {
            audioOutSelected = event.target.value;
            handleInputChange(audioInSelected, videoInSelected);
          }}
          className={classes.selectBox}
          MenuProps={{ classes: { paper: classes.selectMenu } }}
        >
          {
            audioOut.map(device=>getMenuItems(device))
          }
        </Select>
      </Grid>

      {/*toggle buttons*/}
      <Grid
        item
        align='center'
        className={classes.buttonHolder}
      >

        {/*toggle audio*/}
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleAudioChange()}
          className={audio ? classes.selectedButton : classes.unSelectedButton}
        >
          Toggle Audio
        </Button>
      </Grid>
      {/*toggle joined*/}
      <Grid
        item
        align='center'
        className={classes.buttonHolder}
      >
        <Button
          color='primary'
          variant='contained'
          onClick={() => handleJoin()}
          className={classes.selectedButton}
        >
          Join Room
        </Button>
      </Grid>

      {/*toggle video*/}
      <Grid
        item
        align='center'
        className={classes.buttonHolder}
      >
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleVideoChange()}
          className={video ? classes.selectedButton : classes.unSelectedButton}
        >
          Toggle Video
        </Button>
      </Grid>
    </Grid>
  );
}
