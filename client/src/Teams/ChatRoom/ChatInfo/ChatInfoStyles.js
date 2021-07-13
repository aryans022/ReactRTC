import { makeStyles } from '@material-ui/core/styles';

const ChatInfoStyles = makeStyles({
  root: {
    height: `50px`,
    background: 'rgb(31, 31, 31)',
  },
  teamName: {
    margin: '0 0.5em 0 1em'
  },
  teamButton: {
    height: '35px',
    minWidth: '35px',
    maxWidth: '35px',
    backgroundColor: 'rgb(20, 150, 125)',
    padding: 0,
    '&:hover': {
      background: 'rgb(26, 188, 156)'
    },
  },
  buttonHolder: {
    marginLeft: 'auto',
    marginRight: '10px'
  },
  icon: {
    width: '30px',
    height: '30px'
  }
});

export default ChatInfoStyles;