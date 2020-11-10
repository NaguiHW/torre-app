import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../Home';
import JobDetails from '../JobDetails';
import Jobs from '../Jobs';

const App = () => (
  <Router>
    <Switch>
      <Route path="/jobs/:id">
        <JobDetails />
      </Route>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/jobs'>
        <Jobs />
      </Route>
    </Switch>
  </Router>
);

export default App;
