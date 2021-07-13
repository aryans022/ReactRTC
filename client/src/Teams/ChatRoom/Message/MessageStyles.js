import { makeStyles } from '@material-ui/core/styles';

const MessageStyles = makeStyles({
  root: {
    padding: '0.25em'
  },
  userImage: {
    height: '2.5em',
    borderRadius: '50%',
    '@media(max-width: 600px)': {
      display: 'none'
    }
  },
  messageRoot: {
    display: 'inline'
  },
  sentMessage: {
    backgroundColor: 'rgb(246, 117, 132)',
    padding: '0.4em',
    borderRadius: '0.2em',
    marginLeft: '1em',
    maxWidth: `60%`,
    '@media(max-width: 600px)': {
      marginLeft: '0'
    },
    margin: 'auto'
  },
  receivedMessage: {
    backgroundColor: 'rgba(40, 40, 40, 1)',
    padding: '0.4em',
    borderRadius: '0.2em',
    marginRight: '1em',
    marginLeft: 'auto',
    maxWidth: `60%`,
    textAlign: 'right',
    '@media(max-width: 600px)': {
      marginRight: '0'
    },
    margin: 'auto'
  },
  displayName: {
    margin: 0,
    fontWeight: '700',
    wordWrap: 'break-word',
    maxWidth: '100%',
  },
  messageBody: {
    wordWrap: 'break-word',
    fontWeight: '400',
    fontSize: '18px'
  }
});

export default MessageStyles;