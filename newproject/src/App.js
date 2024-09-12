import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Bookmarks from './components/bookMarks';
import JobDetails from './components/jobDetails';
import Jobs from './components/home';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/bookmarks" component={Bookmarks} />
          <Route path="/job/:id" component={JobDetails} />
          <Route path="/" component={Jobs} exact />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
