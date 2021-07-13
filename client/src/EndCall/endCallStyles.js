import { makeStyles } from '@material-ui/core';

const endCallStyles = makeStyles({
  holder: {
    height:`calc(100vh - ${60}px)`,
  },
  homeButton: {
    margin:'1em',
    backgroundColor: 'rgba(26, 188, 156, 1)',
    '&:hover': {
      background: 'rgba(30, 222, 183, 1)'
    }
  },
  link: {
    textDecoration: 'none'
  }
});

export default endCallStyles;