import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { signOut } from '../../store/actions/auth';
import styles from './styles';
import titleLogo from '../../images/title_white.svg';

class NavBar extends React.PureComponent {
  state = {
    anchorEl: null,
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleAddClick = () => {
    this.props.history.push('/new');
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSignOutClick = () => {
    this.props.onSignOut();
    this.handleClose();
  }

  handleIconClick = () => {
    this.props.history.push('/home');
  }

  handleProfileClick = () => {
    this.props.history.push('/profile');
    this.handleClose();
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar style={{ justifyContent: 'space-between' }}>
            {/* <Typography variant="h6" color="inherit" className={classes.icon} onClick={this.handleIconClick}>
              Open Box
            </Typography> */}
            <img src={titleLogo} height={50} alt="" />
            <div>
              <IconButton
                style={{ alignSelf: 'end' }}
                onClick={this.handleAddClick}
                color="inherit"
              >
                <AddIcon />
              </IconButton>
              <IconButton
                style={{ alignSelf: 'end' }}
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <SettingsIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleProfileClick}>Your Profile</MenuItem>
                <MenuItem onClick={this.handleSignOutClick}>Sign Out</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  onSignOut: PropTypes.func.isRequired,
  history: PropTypes.any.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignOut: () => dispatch(signOut()),
  };
};

export default compose(
  connect(null, mapDispatchToProps),
  withStyles(styles),
  withRouter,
)(NavBar);
