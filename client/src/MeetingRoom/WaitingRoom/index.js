import React, { createRef } from 'react';
import { Grid } from '@material-ui/core';
import Options from './Options'

class WaitingRoom extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      stream: null,
      video: true,
      audio: true,
      audioIn: [],
      videoIn: [],
      audioOut: [],
      audioInSelected: "",
      videoInSelected: "",
      audioOutSelected: "",
    }
    this.vid = createRef();
  }

  componentDidMount() {

    const { audio, video } = this.props;
    navigator.mediaDevices.getUserMedia({    //get user media with default device
      audio: true,
      video: true
    })
      .then(stream => {
        this.vid.current.srcObject = stream;
        this.setState({ stream: stream });
        this.state.stream.getVideoTracks()[0].enabled = video;
        this.state.stream.getAudioTracks()[0].enabled = audio;

        /*get user device list*/
        navigator.mediaDevices.enumerateDevices().then(devices => {

          let { audioIn, videoIn, audioOut } = this.state;
          let audioInSelected, videoInSelected, audioOutSelected
          let { setAudioInSelected, setVideoInSelected, setAudioOutSelected } = this.props;
          devices.forEach(device => {
            if (device.kind === 'audioinput') {
              audioIn.push(device);
            }
            else if (device.kind === 'videoinput') {
              videoIn.push(device);
            }
            else if (device.kind === 'audiooutput') {
              audioOut.push(device);
            }
          })
          audioInSelected = audioIn[0];
          videoInSelected = videoIn[0];
          audioOutSelected = audioOut[0];

          this.handleInputChange(audioInSelected, videoInSelected);

          setAudioInSelected(audioInSelected);
          setVideoInSelected(videoInSelected);
          setAudioOutSelected(audioOutSelected);
          this.setState({ audioIn, videoIn, audioOut });

        })
          .catch((err) => console.log(err));
      })
  }

  /*handle Input Device Change*/
  handleInputChange(audioInSelected, videoInSelected) {

    const { audio, video, setAudioInSelected, setVideoInSelected } = this.props;

    const options = {
      audio: { deviceId: audioInSelected.deviceId },
      video: { deviceId: videoInSelected.deviceId }
    }
    navigator.mediaDevices.getUserMedia(options)    //reload user media with selected device
      .then(stream => {
        this.vid.current.srcObject = stream;
        this.setState({ stream: stream });
        this.state.stream.getVideoTracks()[0].enabled = video;
        this.state.stream.getAudioTracks()[0].enabled = audio;
      })
      .catch(err=>{
        console.log(err);
      })

    setAudioInSelected(audioInSelected)
    setVideoInSelected(videoInSelected);

  }

  /*toggle audio*/
  handleAudioChange() {
    let { audio, setAudio } = this.props;
    if (this.state.stream) {
      this.state.stream.getAudioTracks()[0].enabled = !(this.state.stream.getAudioTracks()[0].enabled)
      setAudio(!audio);
    }
  }

  /*toggle video*/
  handleVideoChange() {
    let { video, setVideo } = this.props;
    if (this.state.stream) {
      this.state.stream.getVideoTracks()[0].enabled = !(this.state.stream.getVideoTracks()[0].enabled)
      setVideo(!video);
    }
  }

  /*toggle joined*/
  handleJoin() {
    let { setJoined } = this.props;
    if (this.state.stream) {
      this.state.stream.getTracks().forEach(track => track.stop());
      setJoined(true);
    }
    else {
      alert(`Please allow mic and camera settings. You can always turn them off during a video meeting.`)
    }
  }

  /*handle Output Device Change*/
  handleOutputChange(audioOutSelected) {
    const { setAudioOutSelected } = this.props;
    this.attachSinkId(audioOutSelected.deviceId);
    setAudioOutSelected(audioOutSelected);
  }

  // Attach audio output device to video element using device/sink ID.
  attachSinkId(sinkId) {
    if (this.vid.current.sinkId !== undefined) {
      this.vid.current.setSinkId(sinkId)
        .then(() => {
          console.log(`Success, audio output device attached: ${sinkId}`);
        })
        .catch(err=>{
          console.log(err);
        })
    } else {
      console.warn('Browser does not support output device selection.');
    }
  }

  render() {

    let { audioIn, videoIn, audioOut } = this.state;
    let { audioInSelected, videoInSelected, audioOutSelected, audio, video } = this.props;

    return (
      <div>
        <Grid container justify="center">

          {/*preview video*/}
          <Grid item md={12} align='center'>
            <video
              autoPlay
              ref={this.vid}
              style={{
                height: '250px',
                margin: '1em 0 0.5em 0'
              }}
            />
          </Grid>

          {/*options that the user can select*/}
          <Grid item md={12}>
            <Options
              handleInputChange={(currentAudio, currentVideo) => this.handleInputChange(currentAudio, currentVideo)}
              handleAudioChange={() => this.handleAudioChange()}
              handleVideoChange={() => this.handleVideoChange()}
              handleOutputChange={(currentAudio) => this.handleOutputChange(currentAudio)}
              handleJoin={() => this.handleJoin()}
              audioInSelected={audioInSelected}
              videoInSelected={videoInSelected}
              audioOutSelected={audioOutSelected}
              audioIn={audioIn}
              videoIn={videoIn}
              audioOut={audioOut}
              audio={audio}
              video={video}
            />
          </Grid>
        </Grid>

      </div>
    );
  }
}

export default WaitingRoom;