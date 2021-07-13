import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import useStyles from './HeaderStyles';

import { useHistory } from 'react-router-dom';

import { auth } from "../common/config";
import { useAuthState } from 'react-firebase-hooks/auth'
import logo from './logo1.svg'

export default function Navbar() {

  const classes = useStyles();
  const history = useHistory();
  const [user] = useAuthState(auth);

  return (
    <AppBar position="sticky" className={classes.bg}>
      <Toolbar className={classes.toolbar}>

        {/*website title and logo*/}
        <Button
          onClick={() => history.push('/')}
          className={classes.logoButton}
        >
          <img src={logo} className={classes.logo} alt={'logo'} />
          <Typography variant="h6" noWrap className={classes.logoText}>
            ReactRTC
          </Typography>
        </Button>

        {/*sign out button if the user is logged in*/}
        {user ?
          <Button
            color='primary'
            variant='contained'
            onClick={() => {
              auth.signOut().then(() => {
                history.push('/');
              })
            }}
            className={classes.signOutButton}
          >
            Sign Out
          </Button>
          : null
        }

      </Toolbar>
    </AppBar>
  );
}