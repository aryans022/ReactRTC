import React, { useState, useRef } from "react";
import TeamCard from './TeamCard';
import { Grid, Button, Dialog, TextField } from '@material-ui/core';
import useStyles from './TeamListStyles';
import { auth, firestore } from "../../common/config";
import { useCollectionData } from 'react-firebase-hooks/firestore'

const TeamList = (props) => {

  const { teams, setOpenedTeam, setShowTeam } = props;

  const [openJoin, setOpenJoin] = useState(false);
  const [joinTeam, setJoinTeam] = useState('');
  const [openCreate, setOpenCreate] = useState(false);
  const [createText, setCreateText] = useState('');

  const classes = useStyles();
  const scroller = useRef();

  const userRef = firestore.collection(`user`);
  const teamRef = firestore.collection(`teams`);
  const [allTeams] = useCollectionData(teamRef, { idField: 'id' });

  //handle team join request
  const joinTeamHandler = async () => {

    let name = null, photoId = null, check = joinTeam.trim().toLowerCase();
    for (let currentTeam of allTeams) {
      if (currentTeam.id === check) {
        name = currentTeam.name;
        photoId = currentTeam.photoId;
      }
    }
    if (!name) {
      setJoinTeam('');
      return;
    }

    const userData = await userRef.doc(auth.currentUser?.uid).get();
    const data = userData?.data();
    for (let i = 0; i < data?.teams.length; i++) {
      if (data.teams[i].teamId === check) {
        return;
      }
    }

    let editTeams = [];
    if (userData.data()?.teams) {
      editTeams = userData.data()?.teams;
    }
    else {
      editTeams = [];
    }
    editTeams.push({ teamId: check, name, photoId });

    await userRef.doc(auth.currentUser?.uid).set({
      teams: editTeams
    })

    setJoinTeam('');
    setOpenJoin(false);

  }

  //handle team creation request
  const createTeamHandler = async () => {

    let teamName = createText.trim().substring(0, 30);
    if (createText === '') {
      return;
    }

    let teamId = '';
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    for (var i = 0; i < 8; i++) {
      teamId += chars.charAt(Math.floor(Math.random() * 26));
    }

    const userData = await userRef.doc(auth.currentUser?.uid).get();

    let editTeams = [];
    if (userData.data()?.teams) {
      editTeams = userData.data()?.teams;
    }
    else {
      editTeams = [];
    }
    const photoId = Math.floor(Math.random() * 96);
    editTeams.push({ teamId, name: teamName, photoId });


    await Promise.all([
      teamRef.doc(teamId).set({
        name: teamName,
        photoId
      }),
      userRef.doc(auth.currentUser?.uid).set({
        teams: editTeams
      })
    ])

    setCreateText('');
    setOpenCreate(false);
    scroller.current.scrollIntoView({ behavior: 'smooth' });

  }

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignContent="flex-start"
        className={classes.root}
      >

        {/*Show all user team cards from the teams array received from the db*/}
        {teams?.teams?.map((team, i) => (
          <Grid item xs={12} key={`teamGrid${i}`}>
            <TeamCard
              key={`team${i}`}
              teamID={team.id || team}
              teamName={team.name || team}
              photoId={team.photoId}
              setOpenedTeam={() => setOpenedTeam(team)}
              setTeam={setShowTeam}
            />
          </Grid>
        ))}

        {/*Message if the user has not joined any teams*/}
        {
          !teams?.teams?.length ?
            <Grid item xs={12} align='center'
              style={{ display: "flex", alignItems: "center", height: '100%' }}>
              <p style={{ margin: 'auto' }}>
                Join a team with a code, or create a new team and invite your friends
              </p>
            </Grid>
            : null
        }
        <div ref={scroller}></div>
      </Grid>

      {/* team join and create buttons*/}
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.controlButtons}
      >

        {/*join team button*/}
        <Grid item xs={6} align='center'>
          <Button
            className={classes.buttons}
            color='primary'
            variant='contained'
            onClick={() => setOpenJoin(true)}
          >
            Join Team
          </Button>
        </Grid>

        {/*create team button*/}
        <Grid item xs={6} align='center'>
          <Button
            className={classes.buttons}
            color='primary'
            variant='contained'
            onClick={() => setOpenCreate(true)}
          >
            Create Team
          </Button>

          <Dialog
            onClose={() => {
              setOpenCreate(false);
              setCreateText('');
            }}
            open={openCreate}
            PaperProps={{
              style: {
                backgroundColor: 'rgb(31, 31, 31)',
              },
            }}
          >
            <TextField
              label={createText === '' ? "Enter Team Name" : null}
              variant="outlined"
              value={createText}
              onChange={(event) => setCreateText(event.target.value)}
              className={classes.dialogText}
              InputLabelProps={{ shrink: false }}
            />

            <Button onClick={createTeamHandler} className={`${classes.dialogButton} ${classes.buttons}`}>
              Create Team
            </Button>

          </Dialog>

          <Dialog
            onClose={() => {
              setOpenJoin(false);
              setJoinTeam('');
            }}
            open={openJoin}
            PaperProps={{
              style: {
                backgroundColor: 'rgb(31, 31, 31)',
              },
            }}
          >
            <TextField
              label={joinTeam === '' ? "Enter Team Code" : null}
              variant="outlined"
              value={joinTeam}
              onChange={(event) => setJoinTeam(event.target.value)}
              className={classes.dialogText}
              InputLabelProps={{ shrink: false }}
            />

            <Button onClick={joinTeamHandler} className={`${classes.dialogButton} ${classes.buttons}`}>
              Join Team
            </Button>

          </Dialog>

        </Grid>
      </Grid>
    </div>
  );
}

export default TeamList;