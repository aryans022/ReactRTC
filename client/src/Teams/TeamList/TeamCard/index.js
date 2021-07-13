import React, { useState } from "react";
import { Button, Grid } from '@material-ui/core';
import useStyles from './TeamCardStyles';

//if the image is not found, generate a random image.
const handleError = (props) => {
  const { errored, setErrored, setSrc } = props;
  if (!errored) {
    setErrored(true);
    setSrc(`https://picsum.photos/id/${0}/60`);
  }
}

const TeamCard = (props) => {

  const { setOpenedTeam, teamName, photoId, setTeam } = props
  const [errored, setErrored] = useState(false)
  const [src, setSrc] = useState(`https://picsum.photos/id/${photoId}/60`)

  const classes = useStyles();

  return (
    <Button
      onClick={() => {
        setOpenedTeam();
        setTeam(false);
      }}
      className={classes.teamButton}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
      >

        {/*team image*/}
        <img
          src={src}
          alt='img'
          onError={() => handleError({ errored, setErrored, setSrc })}
          className={classes.teamImage}
        />

        {/*team name*/}
        <div className={classes.teamName}>{teamName}</div>
      </Grid>
    </Button>
  );
}

export default TeamCard;