import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper } from '@material-ui/core';
import uuid from 'uuid/v4';
import styles from './styles';

class SquareButton extends React.PureComponent {
  state = {
    image: '',
  }
  handleImageLoadend = (file, reader) => () => {
    const newImage = {
      key: uuid(),
      base64: reader.result,
      name: file.name,
    };
    this.setState({ image: reader.result });
    this.props.onChange(newImage);
  }
  handleFileInputChange = (event) => {
    const { files } = event.target;
    for (let i = 0; i < files.length; i += 1) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = this.handleImageLoadend(files[i], reader);
    }
  }
  handleFileClick = () => {
    this.fileInput.click();
  }
  render() {
    const {
      classes, children,
    } = this.props;
    const { image } = this.state;
    return (
      <Paper className={classes.container} onClick={this.handleFileClick}>
        <input
          type="file"
          style={{ display: 'none' }}
          className={classes.fileInput}
          ref={(ref) => {
            this.fileInput = ref;
          }}
          // multiple
          accept="image/*"
          onChange={this.handleFileInputChange}
        />
        {image ? <img src={image} alt="" className={classes.image} /> : children}
      </Paper>
    );
  }
}

SquareButton.defaultProps = {
  children: '',
  onChange: null,
};

SquareButton.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.string,
  onChange: PropTypes.func,
};

export default withStyles(styles)(SquareButton);
