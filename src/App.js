import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import { checkAuthenticated } from './store/actions/auth';
import HomePage from './components/HomePage';
import EditItemPage from './components/EditItemPage';

class App extends Component {
  constructor(props) {
    super(props);
    props.onCheckAuthenticated();
  }
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
        <Router>
          <div>
            <Route path="/" exact render={() => <Redirect to="/signin" />} />
            <Route
              path="/(signin|signup|confirm)"
              render={({ location }) => {
                if (isAuthenticated) {
                  return (
                    <Redirect
                      to={
                        (location.state && location.state.nextPathName) ?
                          location.state.nextPathName : '/home'}
                    />
                  );
                }
                return <AuthPage />;
              }}
            />
            <Route
              path="/home"
              render={(p) => {
                if (isAuthenticated) {
                  return (<HomePage />);
                }
                return (<Redirect to={{ pathname: '/signin', state: { nextPathName: p.location.pathname } }} />);
              }}
            />
            <Route
              path="/new"
              render={(p) => {
                if (isAuthenticated) {
                  return (<EditItemPage />);
                }
                return (<Redirect to={{ pathname: '/signin', state: { nextPathName: p.location.pathname } }} />);
              }}
            />
          </div>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  onCheckAuthenticated: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: Boolean(state.auth.token),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuthenticated: () => dispatch(checkAuthenticated()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
