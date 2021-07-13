import { makeStyles } from '@material-ui/core/styles';

const HeaderStyles = makeStyles({
  bg: {
    backgroundColor: 'rgb(31, 31, 31)',
    height: '60px'
  },
  toolbar: {
    minHeight: '60px'
  },
  signOutButton: {
    marginLeft: 'auto',
    backgroundColor: 'rgb(173, 35, 35)',
    '&:hover': {
      background: 'rgb(198, 40, 40)'
    }
  },
  logoButton: {
    textTransform: 'none',
    color: 'white'
  },
  logo: {
    height: '30px',
  },
  logoText: {
    marginLeft: '15px',
    '@media(max-width: 400px)': {
      display: 'none',
    }
  }
});

export default HeaderStyles;