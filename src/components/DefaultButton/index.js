import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, CircularProgress } from '@material-ui/core';
import styles from './styles';

const DefaultButton = (props) => {
  const {
    children, color, onClick, disabled, loading, classes, type,
  } = props;
  return (
    <Button
      color={color}
      variant="contained"
      fullWidth
      onClick={onClick}
      size="large"
      disabled={disabled || loading}
      type={type}
    >{children}
      {loading && <CircularProgress color="secondary" size={24} className={classes.buttonProgress} />}
    </Button>
  );
};

DefaultButton.defaultProps = {
  color: 'primary',
  onClick: null,
  disabled: false,
  loading: false,
  type: '',
};

DefaultButton.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.string,
};

export default withStyles(styles)(DefaultButton);

