import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { userLoginSubmit } from './login.actions';
import { env } from './../../env';

import './login.css';

class Login extends Component {

  redirectToAuthenticated() {
    if(this.props.login.authenticated) {
      this.props.history.push(env.defaultAuthenticatedRoute);
    }
  }

  componentWillMount() {
    this.redirectToAuthenticated();
  }

  componentDidUpdate() {
    this.redirectToAuthenticated();
  }

  login = (values) => {
    if(values.username && values.password) {
      this.props.userLoginSubmit(values.username, values.password);
    }
  }


  render() {
    const {handleSubmit} = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 col-sm-3 col-xs-1" />
          <div className="col-md-4 col-sm-6 col-xs-10">
            <div className="pt-card pt-elevation-2 margin-top-20">
              <form onSubmit={handleSubmit(this.login)}>
                <div className="row pad-4">
                  <div className="col-sm-12">
                    <h4>Login</h4>
                  </div>
                </div>
                <div className="row pad-4">
                  <div className="col-sm-12">
                    <Field
                      name="username"
                      component="input"
                      type="text"
                      placeholder="Username"
                      className="pt-input pt-fill"
                      required
                    />
                  </div>
                </div>
                <div className="row pad-4">
                  <div className="col-sm-12">
                    <Field
                      name="password"
                      component="input"
                      type="password"
                      placeholder="Password"
                      className="pt-input pt-fill"
                      required
                    />
                  </div>
                </div>
                <div className="row pad-4">
                  <div className="col-sm-12">
                    <button
                      className="pt-button pt-intent-primary"
                      type="submit"
                    >
                        Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4 col-sm-3 col-xs-1" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    routing: state.routing,
    login: state.login
  }
}

const connected = withRouter(
  connect(mapStateToProps, { userLoginSubmit })(Login)
);

export default reduxForm({ form: 'login' })(connected);
