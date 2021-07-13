import React, { createRef } from 'react';
import { Grid } from '@material-ui/core';
import socket from '../../common/socket';
import iceServers from './iceServers'
import ControlButtons from './controlButtons'
import './room.css';
import ChatRoom from '../../Teams/ChatRoom';

let peers = new Map();
let streams = new Map();
let rem = new Array(4);
let teamId;

class App extends React.Component {

  //define state, refs and teamId
  constructor(props) {
    super(props);
    this.state = {
      connID: '',
      stream: null,
      video: this.props.video,
      audio: this.props.audio,
      sharing: false,
      chat: false
    }
    this.vid = createRef();
    this.rvid0 = createRef();
    this.rvid1 = createRef();
    this.rvid2 = createRef();
    teamId = window.location.pathname.substring(window.location.pathname.length - 8);
  }

  //define socket events
  componentDidMount() {

    this.fetchUserMedia();

    socket.on('ID', id => {                                    //set room ID
      this.setState({ connID: id })
      peers.set(id, null);
    })

    socket.on('joined', id => {                                 //begin webrtc connection

      peers.set(id, new RTCPeerConnection(iceServers));
      streams.set(id, new MediaStream());

      peers.get(id).onicecandidate = (e) => {                   //add onicecandidate function
        if (e.candidate) {
          socket.emit('webrtc_ice_candidate', {
            label: e.candidate.sdpMLineIndex,
            candidate: e.candidate.candidate,
            fromId: this.state.connID,
            toId: id
          })
        }
      }

      peers.get(id).ontrack = (e) => {                          //add remote tracks to stream
        streams.get(id).addTrack(e.track);

        if ((!rem[0] || id === rem[0]) && this.rvid0.current) {
          this.rvid0.current.srcObject = streams.get(id);
          rem[0] = id;
        }
        else if ((!rem[1] || id === rem[1]) && this.rvid1.current) {
          this.rvid1.current.srcObject = streams.get(id);
          rem[1] = id;
        }
        else if ((!rem[2] || id === rem[2]) && this.rvid2.current) {
          this.rvid2.current.srcObject = streams.get(id);
          rem[2] = id;
        }

      }

      if (this.state.stream) {                                  //add local tracks to peerconnection
        this.state.stream.getTracks().forEach((track) => {
          peers.get(id).addTrack(track, streams.get(id))
        })
      }

      if (id !== this.state.connID) {                           //create offer
        peers.get(id).createOffer()
          .then(sdp => {
            peers.get(id).setLocalDescription(sdp)
            socket.emit('webrtc_offer', {
              type: 'webrtc_offer',
              sdp: sdp,
              toId: id,
              fromId: this.state.connID
            })
          })
      }

    })

    socket.on('webrtc_offer', (event) => {                        //accept offer

      peers.set(event.fromId, new RTCPeerConnection(iceServers));
      streams.set(event.fromId, new MediaStream());

      peers.get(event.fromId).setRemoteDescription(new RTCSessionDescription(event.sdp))

      peers.get(event.fromId).onicecandidate = (e) => {         //add onicecandidate function
        if (e.candidate) {
          socket.emit('webrtc_ice_candidate', {
            label: e.candidate.sdpMLineIndex,
            candidate: e.candidate.candidate,
            fromId: this.state.connID,
            toId: e.fromId
          })
        }
      }

      peers.get(event.fromId).ontrack = (e) => {                //add remote tracks to stream
        streams.get(event.fromId).addTrack(e.track);

        if ((!rem[0] || event.fromId === rem[0]) && this.rvid0.current) {
          this.rvid0.current.srcObject = streams.get(event.fromId);
          rem[0] = event.fromId;
        }
        else if ((!rem[1] || event.fromId === rem[1]) && this.rvid1.current) {
          this.rvid1.current.srcObject = streams.get(event.fromId);
          rem[1] = event.fromId;
        }
        else if ((!rem[2] || event.fromId === rem[2]) && this.rvid2.current) {
          this.rvid2.current.srcObject = streams.get(event.fromId);
          rem[2] = event.fromId;
        }
      }

      if (this.state.stream) {                                  //add local track to peerconnection
        this.state.stream.getTracks().forEach((track) => {
          peers.get(event.fromId).addTrack(track, streams.get(event.fromId))
        })
      }

      peers.get(event.fromId).createAnswer().then(sdp => {      //create webrtc answer
        peers.get(event.fromId).setLocalDescription(sdp)
        socket.emit('webrtc_answer', {
          type: 'webrtc_answer',
          sdp: sdp,
          fromId: this.state.connID,
          toId: event.fromId
        })
      })

    })

    socket.on('webrtc_answer', (event) => {                     //set remote desc
      peers.get(event.fromId).setRemoteDescription(new RTCSessionDescription(event.sdp))
    })


    socket.on('webrtc_ice_candidate', (event) => {              //add ICE

      // ICE candidate configuration.
      let candidate = new RTCIceCandidate({
        sdpMLineIndex: event.label,
        candidate: event.candidate,
      })
      peers.get(event.fromId).addIceCandidate(candidate)
    })


    socket.on('remove', (id) => {                               //handle disconnect

      if (rem[0] === id && this.rvid0.current) {
        this.rvid0.current.srcObject = null;
        rem[0] = null;
      }
      else if (rem[1] === id && this.rvid1.current) {
        this.rvid1.current.srcObject = null;
        rem[1] = null;
      }
      else if (rem[2] === id && this.rvid2.current) {
        this.rvid2.current.srcObject = null;
        rem[2] = null;
      }

      peers.delete(id);

    })

  }

  //toggle audio
  handleAudio() {
    if (this.state.stream && this.state.stream.getAudioTracks()[0]) {
      this.state.stream.getAudioTracks()[0].enabled = !(this.state.stream.getAudioTracks()[0].enabled)
      this.setState({ audio: !this.state.audio })
    }
  }

  //toggle video
  handleVideo() {
    if (this.state.stream && this.state.stream.getVideoTracks()[0]) {
      this.state.stream.getVideoTracks()[0].enabled = !(this.state.stream.getVideoTracks()[0].enabled)
      this.setState({ video: !this.state.video })
    }
  }

  //stop stream on exit
  handleExit() {
    peers.forEach((value) => {
      if (value) {
        value.close()
      }
    })
    if (this.state.stream) {
      this.state.stream.getTracks().forEach((track) => {
        track.stop();
      })
    }
    socket.emit('endCall');
  }

  //toggle sharing
  handleSharing() {
    this.state.stream.getTracks().forEach(track => track.stop());
    this.state.sharing ? this.fetchUserMedia() : this.fetchDisplayMedia();
    this.setState({ sharing: !this.state.sharing });
  }

  //utitlity function to get user display
  fetchDisplayMedia() {
    navigator.mediaDevices.getDisplayMedia({                     //get permission and add track
      audio: true,
      video: true
    }).then(stream => {
      stream.getVideoTracks()[0].onended = () => {
        this.fetchUserMedia();
      }
      this.setState({ sharing: !this.state.sharing });
      if (this.vid.current)
        this.vid.current.srcObject = stream;
      streams.set(this.state.connID, stream);
      this.setState({ stream: stream });
      socket.emit('join room1', window.location.pathname.substring(window.location.pathname.length - 8));
    }).catch((err) => {
      this.fetchUserMedia();
      this.setState({ sharing: false });
      console.log(err);
    })
  }

  //utility function to get user cam and mic
  fetchUserMedia() {
    navigator.mediaDevices.getUserMedia({                     //get permission and add track
      audio: { deviceId: this.props.audioInSelected.deviceId },
      video: { deviceId: this.props.videoInSelected.deviceId }
    }).then(stream => {
      if (this.vid.current)
        this.vid.current.srcObject = stream;
      stream.getAudioTracks()[0].enabled = this.state.audio;
      stream.getVideoTracks()[0].enabled = this.state.video;
      streams.set(this.state.connID, stream);
      this.setState({ stream: stream });
      socket.emit('join room1', window.location.pathname.substring(window.location.pathname.length - 8));
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {

    return (

      <Grid container className='roomRoot'>

        {/*display chat box*/}
        {this.state.chat ?
          (<Grid item>
            <ChatRoom
              team={{ teamId }}
              style={{
                width: '300px'
              }}
            />
          </Grid>)
          :
          null
        }

        {/*main video area*/}
        <Grid item style={this.state.chat ? { width: 'calc(100vw - 300px)' } : { width: 'calc(100vw)' }}>
          <div className='roomHolder'>

            {/*display all 4 participant streams*/}
            <div className='videoHolder'>

              <Grid container className='videoRow'>
                <Grid item className='videoBox'>
                  <video
                    autoPlay
                    muted
                    ref={this.vid}
                  />
                  <div style={{ width: '10px' }}></div>
                </Grid>

                <Grid item style={{ width: '10px' }}></Grid>

                <Grid item className='videoBox'>
                  <video
                    autoPlay
                    ref={this.rvid0}
                  />
                </Grid>
              </Grid>

              <Grid container className='videoRow'>
                <Grid item className='videoBox'>
                  <video
                    autoPlay
                    ref={this.rvid1}
                  />
                </Grid>

                <Grid item style={{ width: '10px' }}></Grid>

                <Grid item className='videoBox'>
                  <video
                    autoPlay
                    ref={this.rvid2}
                  />
                </Grid>
              </Grid>

            </div>


            {/*display the toggle buttons for the user*/}
            <ControlButtons
              handleAudio={() => this.handleAudio()}
              handleVideo={() => this.handleVideo()}
              handleExit={() => this.handleExit()}
              handleSharing={() => this.handleSharing()}
              audio={(this.state.stream && this.state.stream.getAudioTracks()[0] && this.state.stream.getAudioTracks()[0].enabled)}
              video={(this.state.stream && this.state.stream.getVideoTracks()[0] && this.state.stream.getVideoTracks()[0].enabled)}
              sharing={this.state.sharing}
              chat={this.state.chat}
              handleChat={() => this.setState({ chat: !this.state.chat })}
            />
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default App;
