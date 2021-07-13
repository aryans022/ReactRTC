# ReactRTC

<!--[![Downloads](http://pepy.tech/badge/shallow-backup)](http://pepy.tech/count/shallow-backup)-->
<!--[![Build Status](https://travis-ci.com/alichtman/shallow-backup.svg?branch=master)](https://travis-ci.com/alichtman/shallow-backup)-->
<!--[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1719da4d7df5455d8dbb4340c428f851)](https://www.codacy.com/app/alichtman/shallow-backup?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=alichtman/shallow-backup&amp;utm_campaign=Badge_Grade)
<!-- [![Coverage Status](https://coveralls.io/repos/github/alichtman/shallow-backup/badge.svg?branch=master)](https://coveralls.io/github/alichtman/shallow-backup?branch=master) -->

`ReactRTC` is a live chat web application with support for both text messages and video call facilities. The app has been built using ReactJS, ExpressJS, WebRTC, Socket.io, Firebase, Azure Communication Services and MaterialUI.

Hosted at https://reactrtc.herokuapp.com/

<!--![Shallow Backup GIF Demo](img/shallow-backup-demo.gif)-->

Contents
========

 * [Features](#Features)
 * [Running the project](#Running-the-project)
 * [Usage](#usage)
 * [Git Integration](#git-integration)
 * [What can I back up?](#what-can-i-back-up)
 * [Configuration](#configuration)
 * [Output Structure](#output-structure)
 * [Reinstalling Dotfiles](#reinstalling-dotfiles)
 * [Want to contribute?](#want-to-contribute)

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
