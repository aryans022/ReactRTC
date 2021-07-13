import React from 'react';
import { Button } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import CallEndIcon from '@material-ui/icons/CallEnd';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import StopScreenShareIcon from '@material-ui/icons/StopScreenShare';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';
import { useHistory } from 'react-router-dom';
import useStyles from './ControlButtonStyles';

export default function ControlButtons(props) {

  const history = useHistory();
  const classes = useStyles();

  return (
    <div style={{ position: 'relative', zIndex: 1, top: '-75px' }}>

      {/*toggle chat*/}
      <Button
        className = {props.chat ? classes.selectedButton : classes.unSelectedButton}
        variant="contained"
        color="primary"
        onClick={props.handleChat}
      >
        {
          props.chat ?
            <SpeakerNotesIcon /> :
            <SpeakerNotesOffIcon />
        }
      </Button>

      {/*toggle audio*/}
      <Button
        className = {props.audio ? classes.selectedButton : classes.unSelectedButton}
        variant="contained"
        color="primary"
        onClick={props.handleAudio}
      >
        {
          props.audio ?
            <MicIcon /> :
            <MicOffIcon />
        }
      </Button>

      {/*end call*/}
      <Button
        className = {classes.unSelectedButton}
        variant="contained"
        color="primary"
        onClick={() => {
          props.handleVideo();
          props.handleExit();
          history.push("/endcall");
        }}
      >
        <CallEndIcon />
      </Button>

      {/*toggle video*/}
      <Button
        className = {props.video ? classes.selectedButton : classes.unSelectedButton}
        variant="contained"
        color="primary"
        onClick={props.handleVideo}
      >
        {
          props.video ?
            <VideocamIcon /> :
            <VideocamOffIcon />
        }
      </Button>

      
      {/*toggle screen share*/}
      <Button
        className = {!props.sharing ? classes.selectedButton : classes.unSelectedButton}
        variant="contained"
        color="primary"
        onClick={props.handleSharing}
      >
        {
          props.sharing ?
            <StopScreenShareIcon /> :
            <ScreenShareIcon />
        }
      </Button>
    </div>
  );
}