import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter, Link, Redirect} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { getNode, confirmNode } from './confirmNode.actions';

class ConfirmNode extends Component {
  componentWillMount() {
    this.props.getNode(this.props.match.params.id);
  }

  submit = (values) => {
    this.props.confirmNode({
      ...values,
      id: this.props.match.params.id
    });
  }

  render() {

    if(this.props.node && this.props.node.UserId !== this.props.login.user.id) {
      return (<Redirect to={{
          pathname: '/login',
        }} />);
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-6 col-sm-4 col-sm-offset-2">
            <h3>
              Network > Confirm Node
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
                  <label className="pt-label width-120" htmlFor="name">
                    Name
                  </label>
                  <div className="pt-form-content">
                    <label className="pt-label width-120" htmlFor="name">
                      {this.props.node
                        ? this.props.node.name : ''}
                    </label>
                  </div>
                </div>

                <div className="pt-form-group pt-inline">
                  <label className="pt-label width-120" htmlFor="name">
                    Host
                  </label>
                  <div className="pt-form-content">
                    <label className="pt-label width-120" htmlFor="name">
                      {this.props.node
                        ? this.props.node.host : ''}
                    </label>
                  </div>
                </div>

                <div className="pt-form-group pt-inline">
                  <label className="pt-label width-120" htmlFor="email">
                    Port
                  </label>
                  <div className="pt-form-content">
                    <Field
                      name="port"
                      component="input"
                      type="number"
                      placeholder="22005"
                      className="pt-input"
                      required
                    />
                    <div className="pt-form-helper-text">Enter geth rpc port number</div>
                  </div>
                </div>

                <div className="pt-form-group pt-inline">
                  <label className="pt-label width-120" htmlFor="publicIp">
                    Const. Port
                  </label>
                  <div className="pt-form-content">
                    <Field
                      name="constellationPort"
                      component="input"
                      type="number"
                      placeholder="8801"
                      className="pt-input"
                      required
                    />
                    <div className="pt-form-helper-text">Port number for constellation API</div>
                  </div>
                </div>

                <div className="pt-form-group pt-inline">
                  <label className="pt-label width-120" htmlFor="publicIp">
                    Account Address
                  </label>
                  <div className="pt-form-content">
                    <Field
                      name="accountAddress"
                      component="input"
                      type="text"
                      placeholder="0xed9d02e382b34818e88b88a309c7fe71e65f419d"
                      className="pt-input width-360"
                      required
                    />
                    <div className="pt-form-helper-text">Coinbase for this node</div>
                  </div>
                </div>

                <div className="pt-form-group pt-inline">
                  <label className="pt-label width-120" htmlFor="publicIp">
                    Public Key
                  </label>
                  <div className="pt-form-content">
                    <Field
                      name="publicKey"
                      component="input"
                      type="text"
                      placeholder="AnkasndkAKSmdnkamsndKMASNdkmna313dASd"
                      className="pt-input width-360"
                      required
                    />
                    <div className="pt-form-helper-text">Public key for this node</div>
                  </div>
                </div>




                <button className="pt-button pt-intent-primary" onClick={this.props.handleSubmit(this.submit)}>Confirm Node</button>

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
    login: state.login,
    node: state.confirmNode.node,
  };
}

const connected = withRouter(
  connect(mapStateToProps,{ getNode, confirmNode })(ConfirmNode)
);

export default reduxForm({form:'confirmNodeForm'})(connected);
