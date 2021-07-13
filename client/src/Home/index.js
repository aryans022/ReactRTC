import React from "react";
import firebase from "firebase/app";
import { auth } from "../common/config";

import { useAuthState } from 'react-firebase-hooks/auth'

import { useHistory } from 'react-router-dom';

import { Button, Grid } from '@material-ui/core';
import useStyles from './HomeStyles';

export const AuthPage = () => {

  const [user] = useAuthState(auth);
  const history = useHistory();

  const classes = useStyles();

  if (user) {
    history.push('/teams');
  }

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >

      <Grid item>
        <div className={classes.flexBox}>

          {/*microsoft sign in*/}
          <Button
            className={classes.signInButton}
            color='primary'
            variant='contained'
            onClick={() => {
              const microsoftAuthProvider = new firebase.auth.OAuthProvider('microsoft.com');
              firebase.auth().signInWithPopup(microsoftAuthProvider).catch((error) => {
                alert("We were not able to sign you in. Please try again or use another sign in method.");
                console.log(error)
              });
            }}
          >
            Sign In with Microsoft
          </Button>

          {/*google sign in*/}
          <Button
            className={classes.signInButton}
            color='primary'
            variant='contained'
            onClick={() => {
              const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
              auth.signInWithPopup(googleAuthProvider);
            }}
          >
            Sign In with Google
          </Button>
        </div>
      </Grid>

    </Grid>
  );
};
export default AuthPage;
