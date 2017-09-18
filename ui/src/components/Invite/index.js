import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link, Redirect} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { addNode, inviteSuccess } from './invite.actions';

class Invite extends Component {

  submit = (values) => {
    this.props.addNode(values);
  };

  render() {
    if(this.props.invite.nodeCreated) {
      return(
        <Redirect to={{
          pathname: '/dashboard'
        }} />
      )
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-6 col-sm-4 col-sm-offset-2">
            <h3>
              Network > Invite Party
            </h3>
          </div>
          <div className="col-xs-6 col-sm-4 text-right pad-top-16">
            <Link to="/dashboard">
              <button type="button" className="pt-button pt-intent-primary">
                Back
              </button>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-sm-offset-2">
            <div className="pt-card">
              <h4>Enter Party Information</h4>
              <hr />
              <form>
                <div className="pt-form-group pt-inline">
                  <label className="pt-label width-120" htmlFor="name">
                    Name
                  </label>
                  <div className="pt-form-content">
                    <Field
                      name="nodeName"
                      component="input"
                      type="text"
                      placeholder="node X"
                      className="pt-input"
                      required
                    />
                    <div className="pt-form-helper-text">Name for the new node</div>
                  </div>
                </div>
                <div className="pt-form-group pt-inline">
                  <label className="pt-label width-120" htmlFor="email">
                    Email
                  </label>
                  <div className="pt-form-content">
                    <Field
                      name="email"
                      component="input"
                      type="text"
                      placeholder="xxx@yyy.zzz"
                      className="pt-input"
                      required
                    />
                    <div className="pt-form-helper-text">Enter email address for network party</div>
                  </div>
                </div>
                <div className="pt-form-group pt-inline">
                  <label className="pt-label width-120" htmlFor="publicIp">
                    Public IP
                  </label>
                  <div className="pt-form-content">
                    <Field
                      name="host"
                      component="input"
                      type="text"
                      placeholder="8.8.8.8"
                      className="pt-input"
                      required
                    />
                    <div className="pt-form-helper-text">Public IP for network party</div>
                  </div>
                </div>

                <button className="pt-button pt-intent-primary" onClick={this.props.handleSubmit(this.submit)}>Invite Participant</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    invite: state.invite
  };
}

const connected = withRouter(
  connect(mapStateToProps,{ inviteSuccess, addNode })(Invite)
);

export default reduxForm({form:'inviteForm'})(connected);
