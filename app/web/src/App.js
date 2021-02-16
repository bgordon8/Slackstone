import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import GetStarted from './pages/GetStarted';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Workspace from './pages/Workspace';

const NotFound = () => {
  return <h1>404 not found</h1>;
};

function App() {
  return (
    <Router>
      <Switch>
        <AuthenticatedRoute path="/workspace/:workspaceId">
          <Workspace />
        </AuthenticatedRoute>

        <AuthenticatedRoute path="/get-started">
          <GetStarted />
        </AuthenticatedRoute>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/">
          <Home />
        </Route>

        <Route path="*">
          <NotFound />>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
