import React, {Component} from 'react';
import { connect } from 'react-redux';
import { userLogout } from './../Login/login.actions';

class Header extends Component {
  render() {

    return (
      <nav className="pt-navbar">
        <div className="pt-navbar-group pt-align-left">
          <div>
            <div className="pt-navbar-heading">Network Dashboard</div>
          </div>
        </div>
        {
          this.props.login.authenticated
          ?
            <div className="pt-navbar-group pt-align-right">
              <button
                className="pt-button pt-minimal"
                onClick={(e) => {this.props.userLogout();}}
              >
                <span className="pt-icon-standard pt-icon-user"></span>
                Logout
              </button>
            </div>
          : <div className="pt-navbar-group pt-align-right"></div>
        }
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.login
  };
}

export default connect(mapStateToProps, {userLogout})(Header);
