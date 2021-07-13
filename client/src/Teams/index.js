import { auth, firestore } from "../common/config";

import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentData } from 'react-firebase-hooks/firestore'

import { Grid } from '@material-ui/core';
import React, { useState } from "react";
import useWindowSize from "../common/useWindowSize";

import ChatRoom from './ChatRoom';
import TeamList from './TeamList';

const Teams = () => {

  const [openedTeam, setOpenedTeam] = useState(null);
  const [showTeam, setShowTeam] = useState(true);

  const [user] = useAuthState(auth);

  const [width] = useWindowSize();

  const userRef = firestore.collection(`user`);
  const [userTeams] = useDocumentData(userRef.doc(user?.uid ? user?.uid : 'wrongpath'), { idField: 'id' })

  const MessageBox = () => {
    return (
      user && openedTeam ?
        <Grid item xs={12} sm={9}>
          <ChatRoom team={openedTeam} setShowTeam={setShowTeam} />
        </Grid>
        :
        <Grid item xs={12} sm={9} align='center'
          style={{ display: "flex", alignItems: "center" }}>
          <p style={{ margin: 'auto' }}>
            Please select the team you want to view
          </p>
        </Grid>)
  }

  return (
    <Grid
      container
      direction="row"
    >

      {
        (showTeam || width > 600) ?
          <Grid item xs={12} sm={3}>
            <TeamList
              teams={userTeams}
              setOpenedTeam={setOpenedTeam}
              setShowTeam={setShowTeam}
            />
          </Grid>
          :
          null
      }

      {
        (!showTeam || width > 600) ?
          <MessageBox />
          :
          null
      }

    </Grid>
  );
};

export default Teams;
