import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import Firebase, {withFirebase} from './firebase/index'

// Pages
import Home from './pages/home'

function App(props: {firebase: Firebase}) {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </Router>
  );
}

export default withFirebase(App);
