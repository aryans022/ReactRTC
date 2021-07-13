import { makeStyles } from '@material-ui/core/styles';

const ChatRoomStyles = makeStyles({
  root: {
    height: `calc(100vh - ${60}px)`,
    width: '100%',
    position: 'relative'
  },
  messageHolder: {
    height: `calc(100vh - ${100}px - ${6}em)`,
    width: '100%',
    overflow: 'auto',
    margin: '0em 1em',
    position: 'relative',
    top: '-40px',
    '&::-webkit-scrollbar': {
      width: '0.3em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      borderWidth: '0px 1px 0px 0',
      borderColor: 'rgb(31, 31, 31)',
      borderStyle: 'solid '
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgb(31, 31, 31)'
    }
  },
  textHolder: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  textbox: {
    background: 'rgb(31, 31, 31)',
    borderRadius: '0.5em',
    border: 'none',
    height: '2.5em',
    margin: '0.5em',
    width: `calc(100% - ${8}em)`,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: 'none'
      },
      "&.Mui-focused fieldset": {
        border: 'none'
      }
    },
    '@media(min-width: 600px)': {
      width: `calc(100% - ${11}em)`,
      height: '3em',
      margin: '1em',
    }
  },
  input: {
    borderRadius: '0.5em',
    border: 'none',
    shrink: false,
    color: 'rgb(200, 200, 200)',
  },
  controlButton: {
    margin: '1em 0.5em',
    height: '2.5em',
    minWidth: '2.5em',
    maxWidth: '2.5em',
    backgroundColor: 'rgb(20, 150, 125)',
    padding: 0,
    '&:hover': {
      background: 'rgb(26, 188, 156)'
    },
    '@media(min-width: 600px)': {
      minWidth: '3em',
      maxWidth: '3em',
      height: '3em',
    }
  },
  noMessage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  icon: {
    width: '30px',
    height: '30px'
  }
});

export default ChatRoomStyles;