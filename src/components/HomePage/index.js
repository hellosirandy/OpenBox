import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import NavBar from '../NavBar';

class HomePage extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <NavBar />
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles))(HomePage);
