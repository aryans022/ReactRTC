import { makeStyles } from '@material-ui/core/styles';

const TeamCardStyles = makeStyles({
  teamImage: {
    borderRadius: '50%',
    margin: '1em',
    height: '3em',
    display: 'none',
    '@media(min-width: 1024px)': {
      display: 'inline'
    }
  },
  teamButton: {
    background: 'rgb(31, 31, 31)',
    margin: '0.5em 1em',
    borderRadius: '1em',
    width: `calc(100% - ${2}em)`,
    height: '5em',
    color: 'white',
    textTransform: 'none',
    '&:hover': {
      background: 'rgb(26, 26, 26)'
    }
  },
  teamName: {
    display: 'inline',
    overflowWrap: 'break-word',
    maxWidth: `100%`,
    margin: 'auto',
    '@media(min-width: 1024px)': {
      maxWidth: `calc(100% - ${5}em)`,
      margin: '0',
      textAlign: "left",
    }
  }
});

export default TeamCardStyles;