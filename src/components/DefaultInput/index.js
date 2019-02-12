import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import styles from './styles';

const DefaultInput = (props) => {
  const {
    classes, placeholder, onChange, type, label, disabled, error, value,
  } = props;
  return (
    <div>
      <TextField
        disabled={disabled}
        error={error}
        value={value}
        label={label}
        className={classes.input}
        type={type}
        margin="dense"
        variant="outlined"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

DefaultInput.defaultProps = {
  placeholder: '',
  onChange: null,
  type: null,
  label: '',
  disabled: false,
  error: false,
  value: '',
};

DefaultInput.propTypes = {
  classes: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  value: PropTypes.string,
};

export default withStyles(styles)(DefaultInput);
