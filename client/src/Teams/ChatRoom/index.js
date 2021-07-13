import React, { useState, useRef, useEffect } from 'react';
import firebase from 'firebase/app';
import { auth, firestore } from '../../common/config';

import { useCollectionData } from 'react-firebase-hooks/firestore'

import { Button, TextField, Grid } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import useStyles from './ChatRoomStyles';

import ChatInfo from './ChatInfo';
import Message from './Message';

import socket from "../../common/socket"

import { useHistory } from 'react-router-dom';

const ChatRoom = (props) => {

  const { team, setShowTeam } = props;

  const [currentMessage, setCurrentMessage] = useState('');
  const [errorText, setErrorText] = useState(null);
  const scroller = useRef();

  const messageRef = firestore.collection('teams').doc(team.teamId || team).collection('messages');
  const query = messageRef.orderBy('createdAt').limitToLast(25);
  const [messages] = useCollectionData(query, { idField: 'id' });

  const classes = useStyles();
  const history = useHistory();

  //show alert in case of an error
  if (errorText) {
    alert(errorText.toLo);
    setErrorText(null);
  }

  /*check if room is full before joining*/
  useEffect(() => {

    socket.on("wrong code", () => setErrorText("Team does not exist."))
    socket.on("room full", () => setErrorText("The room is full."))

    socket.on("room joined", () => {
      setErrorText(null);
      history.push(`/room/${team.teamId || team}`);
    })

  }, [history, team]);

  //send message to the chat room
  const sendMessage = async () => {

    const { uid, photoURL, displayName } = auth.currentUser;

    let message = currentMessage.trim();
    if (message === '') {
      return;
    }


    await messageRef.add({
      text: message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName
    })

    setCurrentMessage('');

    scroller.current.scrollIntoView({ behavior: 'smooth' });

  }

  //send message on pressing enter
  const handleKeyPress = (target) => {
    if (target.charCode === 13) {
      sendMessage();
    }
  }

  const inRoom = props.style ? true : false;
  let prev = null;

  return (
    <Grid
      container
      direction='row'
      justify='center'
      className={classes.root}
      style={props.style}
    >

      {/*team name and code toolbar*/}
      <ChatInfo
        name={team.name || null}
        code={team.teamId || 'not found'}
        inRoom={inRoom}
        setTeam={setShowTeam}
      />

      {/*show all messages as received from the db*/}
      <div className={classes.messageHolder} style={inRoom ? { margin: '0px' } : null}>

        {/*mapping individual messages*/}
        {messages?.map(msg => {
          let flag = prev === msg.uid
          prev = msg.uid
          return (
            <Message
              key={msg.id}
              message={msg}
              inRoom={inRoom}
              prev={flag}
            />)
        })}

        {/*text to show if no messages are found*/}
        {messages?.length === 0 ?
          <div className={classes.noMessage}>
            No messages till now
          </div>
          : null}
        <div ref={scroller}></div>

      </div>

      {/*textbox footer*/}
      <Grid
        item
        xs={12}
        className={classes.textHolder}
      >
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
        >
          {/*show textbox and style according to where it is being displayed*/}
          <TextField
            variant='outlined'
            value={currentMessage}
            onChange={(event) => setCurrentMessage(event.target.value)}
            className={classes.textbox}
            style={inRoom ? { margin: '1em 0em 1em 0.5em', width: `calc(100% - ${4}em)` } : null}
            onKeyPress={handleKeyPress}
            InputProps={{
              className: classes.input,
            }}
          />

          {/*send message button*/}
          <Button
            color='primary'
            variant='contained'
            onClick={sendMessage}
            className={classes.controlButton}
          >
            <SendIcon className={classes.icon} />
          </Button>

          {/*join video button if the person isn't currently in the room*/}
          {!inRoom ? <Button
            color='primary'
            variant='contained'
            onClick={() => {
              socket.emit("join room", team.teamId || team);
            }}
            className={classes.controlButton}
          >
            <VideoCallIcon className={classes.icon} />
          </Button> : null}
        </Grid>
      </Grid>

    </Grid>
  );
};
export default ChatRoom;
