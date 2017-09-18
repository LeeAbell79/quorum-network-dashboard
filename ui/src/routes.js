import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute/';
import Confirm from './components/Confirm';
import Dashboard from './components/Dashboard';
import Invite from './components/Invite';
import Login from './components/Login';

export const routes = (
  <Switch>
    <Route exact path="/">
      <Redirect to="/dashboard" />
    </Route>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/confirm/:token" component={Confirm}/>
    <ProtectedRoute exact path="/dashboard" component={Dashboard}/>
    <ProtectedRoute exact path="/invite" component={Invite} roles={['admin']}/>
  </Switch>
);
