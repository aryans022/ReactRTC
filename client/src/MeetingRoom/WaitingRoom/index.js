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

    });
  }

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

    setAudioInSelected(audioInSelected)
    setVideoInSelected(videoInSelected);

  }

  handleAudioChange() {
    let { audio, setAudio } = this.props;
    if (this.state.stream) {
      this.state.stream.getAudioTracks()[0].enabled = !(this.state.stream.getAudioTracks()[0].enabled)
      setAudio(!audio);
    }
  }
  handleVideoChange() {
    let { video, setVideo } = this.props;
    if (this.state.stream) {
      this.state.stream.getVideoTracks()[0].enabled = !(this.state.stream.getVideoTracks()[0].enabled)
      setVideo(!video);
    }
  }
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

  render() {

    let { audioIn, videoIn, audioOut } = this.state;
    let { audioInSelected, videoInSelected, audioOutSelected, audio, video } = this.props;

    return (
      <div>
        <Grid container justify="center">
          <Grid item md={12} align='center'>
            <video
              autoPlay
              ref={this.vid}
              style={{
                height: '250px',
                margin: '2em 0 0.5em 0'
              }}
            />
          </Grid>

          <Grid item md={12}>
            <Options
              handleInputChange={(currentAudio, currentVideo) => this.handleInputChange(currentAudio, currentVideo)}
              handleAudioChange={() => this.handleAudioChange()}
              handleVideoChange={() => this.handleVideoChange()}
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