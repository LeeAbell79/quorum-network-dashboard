import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import NodeList from '../NodeList/';
import {
  addNodeNavigationSuccess
} from '../AddNode/addNode.actions';

class Dashboard extends Component {
  componentWillMount = () => {
    this.props.addNodeNavigationSuccess();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-6 col-sm-4 col-sm-offset-2">
            <h3>
              Network
            </h3>
          </div>
          <div className="col-xs-6 col-sm-4 text-right pad-top-16">
            <Link to="/add-node">
              <button type="button" className="pt-button pt-intent-primary">
                Add Node
              </button>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-sm-offset-2">
            <div className="pt-card">
              <h4>Members</h4>
              <NodeList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      addNodeNavigationSuccess
    }
  )(Dashboard)
);
