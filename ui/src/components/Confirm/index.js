import React, { Component } from 'react';
import { confirmAccount } from './confirm.actions';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

// TODO: add a password confirmation field
class Confirm extends Component {

  submit = (values) => {
    this.props.confirmAccount(
      this.props.match.params.token,
      values.password
    );
  }

  render() {
    let message = "";
    //TODO: refactor
    if(this.props.match.params.token) {
      if(
        !this.props.confirm.confirmationInProgress
        && !this.props.confirm.confirmationCompleted) {
        message = "";
      }
      else if(this.props.confirm.confirmationInProgress) {
        message = "Confirming account ...";
      }
      else if(
        this.props.confirm.confirmationCompleted &&
        this.props.confirm.confirmationSuccessful
      )
      {
        return (<Redirect to={{
            pathname: '/login',
          }} />);
      }
      else {
        message = "Invalid confirmation token. Please contact network admin.";
      }
    }
    else {
      message = "Could not parse token";
    }


    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-8 col-sm-6 col-xs-offset-2 col-sm-offset-3 pad-top-20">
            <div className="pt-card pt-elevation-2">
              {
                message !== ""
                ? <h4>{message}</h4>
                :
                  <form>
                    <div className="pt-form-group pt-inline">
                      <label className="pt-label width-120" htmlFor="publicIp">
                        Password
                      </label>
                      <div className="pt-form-content">
                        <Field
                          name="password"
                          component="input"
                          type="password"
                          className="pt-input"
                          required
                        />
                      </div>
                    </div>
                    <button className="pt-button pt-intent-primary width-120" onClick={this.props.handleSubmit(this.submit)}>Confirm</button>
                  </form>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    confirm: state.confirm
  };
}

const connected = withRouter(
  connect(mapStateToProps,{ confirmAccount })(Confirm)
);

export default reduxForm({form:'confirmationForm'})(connected);
