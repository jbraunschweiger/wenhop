import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import './App.css';
import Firebase, {withFirebase} from './firebase/index'

// Pages
import Home from './views/home'
import Rocket from './views/rocket'

function App(props: {firebase: Firebase}) {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/rocket/:name' component={Rocket} />
      </Switch>
    </Router>
  );
}

export default withFirebase(App);
