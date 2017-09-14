import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link, Redirect} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { addNode } from './addNode.actions';

class AddNode extends Component {

  submit = (values) => {
    this.props.addNode(values);
  }

  render() {
    if(this.props.addNodeState.redirectToDashboard) {
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
              Network > Add Node
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
              <h4>Enter Node Information</h4>
              <hr />
              <form>
                <div className="pt-form-group pt-inline">
                  <label className="pt-label width-120" htmlFor="node-name">
                    Name
                  </label>
                  <div className="pt-form-content">
                    <Field
                      name="name"
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
                  <label className="pt-label width-120" htmlFor="node-host">
                    Host
                  </label>
                  <div className="pt-form-content">
                    <Field
                      name="host"
                      component="input"
                      type="text"
                      placeholder="10.0.0.4"
                      className="pt-input"
                      required
                    />
                    <div className="pt-form-helper-text">Example: 'localhost', '192.168.1.2' ...</div>
                  </div>
                </div>
                <div className="pt-form-group pt-inline">
                  <label className="pt-label width-120" htmlFor="node-name">
                    RPC Port
                  </label>
                  <div className="pt-form-content">
                    <Field
                      name="port"
                      component="input"
                      type="number"
                      placeholder="22001"
                      className="pt-input"
                      required
                    />
                    <div className="pt-form-helper-text">Port Number for Geth RPC</div>
                  </div>
                </div>
                <div className="pt-form-group pt-inline">
                  <label className="pt-label width-120" htmlFor="node-name">
                    API Port
                  </label>
                  <div className="pt-form-content">
                    <Field
                      name="constellationPort"
                      component="input"
                      type="number"
                      placeholder="9001"
                      className="pt-input"
                      required
                    />
                    <div className="pt-form-helper-text">Port number for constellation API</div>
                  </div>
                </div>
                <div className="pt-form-group pt-inline">
                  <label className="pt-label width-120" htmlFor="node-name">
                    Account Address
                  </label>
                  <div className="pt-form-content">
                    <Field
                      name="accountAddress"
                      component="input"
                      type="text"
                      placeholder="0x40d61053381b27c313f195917b336d502faf74c8"
                      className="pt-input width-360"
                      required
                    />
                    <div className="pt-form-helper-text">Account address for the new node</div>
                  </div>
                </div>
                <div className="pt-form-group pt-inline">
                  <label className="pt-label width-120" htmlFor="node-name">
                    Public Key
                  </label>
                  <div className="pt-form-content">
                    <Field
                      name="publicKey"
                      component="input"
                      type="text"
                      placeholder="8SjRHlUBe4hAmTk3KDeJ96RhN+s10xRrHDrxEi1O5W0="
                      className="pt-input width-420"
                      required
                    />
                    <div className="pt-form-helper-text">Constellation public key for the new node</div>
                  </div>
                </div>
                <button className="pt-button pt-intent-primary width-120" onClick={this.props.handleSubmit(this.submit)}>Add Node</button>
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
    addNodeState: state.addNode
  };
}

const connected = withRouter(
  connect(mapStateToProps,{ addNode })(AddNode)
);

export default reduxForm({form:'addNodeForm'})(connected);
