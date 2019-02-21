import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles, TextField } from '@material-ui/core';
import styles from './styles';

const DefaultTextField = ({
  classes, label, value, placeholder, onChange,
}) => {
  return (
    <TextField
      id="outlined-multiline-static"
      label={label}
      value={value}
      multiline
      placeholder={placeholder}
      rows="4"
      className={classes.textField}
      margin="normal"
      variant="outlined"
      onChange={onChange}
    />
  );
};

DefaultTextField.defaultProps = {
  label: '',
  value: '',
  placeholder: '',
  onChange: null,
};

DefaultTextField.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default compose(withStyles(styles))(DefaultTextField);
