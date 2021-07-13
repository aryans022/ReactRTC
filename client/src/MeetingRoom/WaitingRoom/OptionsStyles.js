import { makeStyles } from '@material-ui/core/styles';

const OptionsStyles = makeStyles({
  root: {
    minWidth: '100%',
  },
  selectedButton: {
    backgroundColor: 'rgb(20, 150, 125)',
    '&:hover': {
      background: 'rgb(26, 188, 156)'
    },
    margin: '1em',
    '@media(max-width: 600px)': {
      margin: '0.5em',
    }
  },
  unSelectedButton: {
    backgroundColor: 'rgb(173, 35, 35)',
    '&:hover': {
      background: 'rgb(198, 40, 40)'
    },
    margin: '1em',
    '@media(max-width: 600px)': {
      margin: '0.5em',
    }
  },
  selectBox: {
    margin: '0.35em',
    background: 'rgb(50, 50, 50)',
    borderRadius: '5px',
    padding: '5px',
    color: 'rgb(200, 200, 200)',
    maxWidth: '300px',
    '&:after': {
      borderColor: 'black',
    },
    "& div": {
      fontSize: '0.8em',
    },
  },
  selectMenu: {
    backgroundColor: 'rgb(31, 31, 31)',
    color: 'rgb(200, 200, 200)',
    overflow: 'hidden',
    "& ul": {
      fontSize: '0.8em',
    },
  },
  buttonHolder: {
    '@media(max-width: 600px)': {
      width: '100%',
    }
  },
  menuLabel: {
    display: 'block',
    maxWidth: '300px',
    fontSize: '1em',
    textOverflow: 'ellipsis'
  }
});

export default OptionsStyles;
