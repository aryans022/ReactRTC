import { makeStyles } from '@material-ui/core/styles';

const HomeStyles = makeStyles({
  root: {
    flexGrow: '1',
    flexFlow: 'column',
    height: `calc(100vh - ${60}px)`
  },
  signInButton: {
    backgroundColor: 'rgba(20, 150, 125, 1)',
    '&:hover': {
      background: 'rgba(26, 188, 156, 1)'
    },
    margin: '1em'
  },
  flexBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column'
  }
});

export default HomeStyles;