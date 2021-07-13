import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import MeetingRoom from './MeetingRoom';
import EndCall from './EndCall';
import Header from './Header';
import Home from './Home';
import Teams from './Teams';
import "firebase/auth";
import useStyles from './AppStyles'

const App = () => {

  useEffect(() => {
    document.title = `ReactRTC`;
  });

  const classes = useStyles();

  let routes = (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/room/:id' exact component={MeetingRoom} />
      <Route path='/endcall' exact component={EndCall} />
      <Route path='/teams' exact component={Teams} />
    </Switch>
  )

  return (
    <div className={classes.bg}>
      <Header />
      {routes}
    </div>
  )
}

export default App;
