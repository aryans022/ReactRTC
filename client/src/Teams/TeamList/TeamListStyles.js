import { makeStyles } from '@material-ui/core/styles';

const TeamListStyles = makeStyles({
  root: {
    height: `calc(100vh - ${4.3}em - ${60}px)`,
    borderStyle: 'solid',
    borderWidth: '0px 1px 0px 0px',
    borderColor: 'rgb(31, 31, 31)',
    padding: '0.5em 0px',
    overflowY: 'auto',
    position: 'relative',
    '&::-webkit-scrollbar': {
      width: '0.3em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgb(31, 31, 31)'
    }
  },
  controlButtons: {
    height: '4.3em',
    backgroundColor: 'rgb(31, 31, 31)',
    boxShadow: "-2px -7px 7px rgba(0,0,0,0.3)",
    position: 'relative',
    zIndex: '20'
  },
  buttons: {
    margin: 'auto',
    backgroundColor: 'rgb(20, 150, 125)',
    padding: '0.3em',
    textTransform: 'none',
    '&:hover': {
      background: 'rgb(26, 188, 156)'
    }
  },
  dialogText: {
    margin: '2em 2em 1em 2em',
    background: 'rgb(235, 235, 235)',
    borderRadius: '0.25em',
    border: 'none',
    height: '3em',
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: 'none'
      },
      "&.Mui-focused fieldset": {
        border: 'none'
      },
    }
  },
  dialogButton: {
    margin: '1em 2em 2em 2em',
    color: 'white',
    textTransform: 'none'
  }
});

export default TeamListStyles;