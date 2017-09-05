import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { env } from './../../env';

class ProtectedRoute extends Route {

  hasRole(roles) {
    const props = this.props;
    return roles.reduce(function(hasRole, role){
      return hasRole || props.login.user.roles.indexOf(role) > -1 ;
    }, false);
  }

  render() {
    const login = this.props.login;
    const component = super.render();

    if(!login.authenticated) {
      return (<Redirect to={{
        pathname: '/login',
        state: { from: this.props.location }
      }} />);
    }

    if(this.props.roles) {
      if(!this.hasRole(this.props.roles)){
        return (
          <div style={{margin:'auto', textAlign:'center'}}>
            <Link to={env.defaultAuthenticatedRoute} >
              Take me to safety
            </Link>
          </div>
        );
      }
    }

    return component;
  }
}

function mapStateToProps(state) {
  return {
    login: state.login
  }
}

export default withRouter(
  connect(mapStateToProps, {})(ProtectedRoute)
);
