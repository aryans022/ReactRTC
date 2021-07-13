const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server)


app.use(express.static('client/build'));

// Express serve up index.html file if it doesn't recognize route
const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});;

function generateRoomId() {                       //generate ID
  let roomId = '';
  let chars = 'abcdefghijklmnopqrstuvwxyz';
  for (var i = 0; i < 5; i++) {
    roomId += chars.charAt(Math.floor(Math.random() * 26));
  }
  return roomId;
}

io.on('connection', (socket) => {                     //new peer

  socket.emit('ID', socket.id);                       //send ID

  socket.on('join room', room => {                    //join room request received

    if (io.sockets.adapter.rooms.get(room)?.size >= 4) {
      socket.emit('room full');
    }
    else {
      socket.join(room);
      socket.emit('room joined');
    }
  });

  socket.on('join room1', room => {                   //joining room and initiating webRTC
    socket.emit('ID', socket.id);

    if (io.sockets.adapter.rooms.get(room)?.size >= 4) {
      socket.emit('room full');
    }
    else {
      socket.join(room);
      socket.to(room).emit('joined', socket.id);
      console.log('emitting', room)
    }
    console.log(io.sockets.adapter.rooms);
  });

  socket.on('webrtc_offer', event => {                //signalling offer
    io.to(event.toId).emit('webrtc_offer', { sdp: event.sdp, fromId: event.fromId });
  });
  socket.on('webrtc_answer', (event) => {             //signalling answer
    io.to(event.toId).emit('webrtc_answer', { sdp: event.sdp, fromId: event.fromId });
  });

  socket.on('webrtc_ice_candidate', (event) => {      //signalling ICE candidate
    io.to(event.toId).emit('webrtc_ice_candidate', event)
  });

  socket.on('endCall', () => {                       //peer disconnected
    io.emit('remove', socket.id);
  });

  socket.on('disconnect', () => {                       //peer disconnected
    io.emit('remove', socket.id);
  });

});

server.listen(process.env.PORT || 8000);
