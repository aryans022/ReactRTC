import { makeStyles } from '@material-ui/core/styles';

const ControlButtonStyles = makeStyles({
  root: {
    minWidth: '100%',
  },
  selectedButton: {
    backgroundColor: 'rgb(20, 150, 125)',
    '&:hover': {
      background: 'rgb(26, 188, 156)'
    },
    margin: '0.5em'
  },
  unSelectedButton: {
    backgroundColor: 'rgb(173, 35, 35)',
    '&:hover': {
      background: 'rgb(198, 40, 40)'
    },
    margin: '0.5em'
  },
});

export default ControlButtonStyles;