import React from 'react';
import { auth } from '../../../common/config';

import { Grid } from '@material-ui/core';
import useStyles from './MessageStyles';

const Message = (props) => {

  const { inRoom, prev, message } = props;
  const { text, uid, photoURL, displayName } = message;

  const classes = useStyles();
  const format = (uid === auth.currentUser?.uid) ? classes.sentMessage : classes.receivedMessage;
  const displayImage = prev ? { visibility: 'hidden', height: '20px', width: '2.5em' } : null;
  const imageURL = photoURL ? photoURL : 'https://image.flaticon.com/icons/png/512/147/147144.png';

  const SentMessage = () => {
    return (< >
      {
        !inRoom ? <img
          src={imageURL}
          alt=''
          className={classes.userImage}
          style={displayImage}
        />
          :
          null
      }
      <div
        className={format}
        style={inRoom ? {
          margin: '0em',
          maxWidth: '270px',
          textAlign: 'left'
        }
          : null}
      >
        <h5 className={classes.displayName} style={prev ? { display: 'none' } : null}>
          {displayName}
        </h5>
        <div className={classes.messageBody} style={inRoom ? { maxWidth: '270px' } : null}>
          {text}
        </div>
      </div>
    </>)
  }

  const ReceivedMessage = () => {
    return (< >
      <div
        className={format}
        style={inRoom ? {
          margin: '0em',
          marginLeft: 'auto',
          maxWidth: '270px',
          textAlign: 'right'
        }
          : null}
      >
        <h5 className={classes.displayName} style={prev ? { display: 'none' } : null}>
          {displayName}
        </h5>
        <div className={classes.messageBody} style={inRoom ? { maxWidth: '270px' } : null}>
          {text}
        </div>
      </div>
      {
        !inRoom ? <img
          src={imageURL}
          alt=''
          className={classes.userImage}
          style={displayImage}
        />
          :
          null
      }
    </>)
  }

  return (
    <Grid
      container
      direction='row'
      className={classes.root}
    >
      {format === classes.sentMessage ?
        <SentMessage /> : <ReceivedMessage />
      }
    </Grid>
  )
}

export default Message;