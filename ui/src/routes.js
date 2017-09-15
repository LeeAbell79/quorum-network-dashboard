import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute/';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddNode from './components/AddNode';

export const routes = (
  <Switch>
    <Route exact path="/">
      <Redirect to="/dashboard" />
    </Route>
    <Route exact path="/login" component={Login}/>
    <ProtectedRoute exact path="/dashboard" component={Dashboard}/>
    <ProtectedRoute exact path="/add-node" component={AddNode} roles={['admin']}/>
  </Switch>
);
