import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute/';
import ConfirmUser from './components/ConfirmUser';
import ConfirmNode from './components/ConfirmNode';
import Dashboard from './components/Dashboard';
import Invite from './components/Invite';
import Login from './components/Login';

export const routes = (
  <Switch>
    <Route exact path="/">
      <Redirect to="/dashboard" />
    </Route>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/nodes/:id/confirm" component={ConfirmNode}/>
    <Route exact path="/invite/:token" component={ConfirmUser}/>
    <ProtectedRoute exact path="/dashboard" component={Dashboard}/>
    <ProtectedRoute exact path="/invite" component={Invite} roles={['admin']}/>
  </Switch>
);
