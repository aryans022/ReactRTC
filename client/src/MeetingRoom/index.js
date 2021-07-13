import React, { useState } from 'react';
import Room from './Room';
import WaitingRoom from './WaitingRoom';
import { Grid } from '@material-ui/core';

export default function ControlButtons(props) {

  let [joined, setJoined] = useState(false);
  let [audioInSelected, setAudioInSelected] = useState('');
  let [videoInSelected, setVideoInSelected] = useState('');
  let [audioOutSelected, setAudioOutSelected] = useState('');
  let [audio, setAudio] = useState(true);
  let [video, setVideo] = useState(true);;

  const VideoRoom = () => {

    return (
      <Grid container>

        {/*Display room if screen size biger than 600px*/}
        <Grid
          item
          style={false ? ({ width: `calc(${100}vw - ${300}px)` }) : ({ width: '100vw' })}
        >
          {
            window.innerWidth > 600 ?
              <Room
                audioInSelected={audioInSelected}
                videoInSelected={videoInSelected}
                audioOutSelected={audioOutSelected}
                audio={audio}
                video={video}
              />
              :
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 'calc(100vh - 60px)',
                margin: '0px 10px',
                textAlign: 'center'
              }}>
                Please rotate your screen and reload if you are using a mobile device
              </div>
          }
        </Grid>
      </Grid>
    )
  }

  return (
    <div>

      {/*Display video room if the user has joined. Else show the waiting room*/}
      {joined ?
        <VideoRoom />
        :
        <WaitingRoom
          audioInSelected={audioInSelected}
          videoInSelected={videoInSelected}
          audioOutSelected={audioOutSelected}
          audio={audio}
          video={video}
          setJoined={setJoined}
          setAudioInSelected={setAudioInSelected}
          setVideoInSelected={setVideoInSelected}
          setAudioOutSelected={setAudioOutSelected}
          setAudio={setAudio}
          setVideo={setVideo}
        />}
    </div>
  );
}