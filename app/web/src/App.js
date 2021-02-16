import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import GetStarted from './pages/GetStarted';
import AuthenticatedRoute from './components/AuthenticatedRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <AuthenticatedRoute path="/get-started">
          <GetStarted />
        </AuthenticatedRoute>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
