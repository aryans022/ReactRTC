# ReactRTC

`ReactRTC` is a live chat web application with support for both text messages and video call facilities. The app has been built using ReactJS, ExpressJS, WebRTC, Socket.io, Firebase, Azure Communication Services and MaterialUI.

Please don't try to establish a connection over wifi and a mobile network. Sometimes, the firewall blocks the webRTC UDP connection to be made. Also, the site might be a bit slow to load when you load it the first time since it is hosted on heroku.
Hosted at https://reactrtc.herokuapp.com/
Video demo at https://vimeo.com/574529384

Contents
========

 * [Features](#Features)
 * [Running the project](#Running-the-project)

### Features
---

+ A simple dark UI for reduced eye strain.
+ Google Authentication support.
+ Microsoft Authentication support.
+ Fully functional team system where each user can create and join any number of teams.
+ Users can chat with their teams before, during and after the meetings. 
+ Video preview in the form of a waiting room before joining a meeting.
+ Options for audio/video preferences provided in the waiting room.
+ Option to select audio/video devices provided in the waiting room.
+ Screen share facility has been provided during video chat.
+ TURN server has been added through azure communication services.
+ Responsive design to facilitate users on all devices.

### Running the project
---

1. Clone the repository and use powershell/command prompt and run the following commands in the project's root directory to start the server.
    + `$ npm install`
    + `$ npm start`
   
2. Open another powershell/command prompt and run the following commands in the project's root directory to start the react client.
    + `$ cd client`
    + `$ npm install`
    + `$ npm start`
