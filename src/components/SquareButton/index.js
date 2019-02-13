import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper } from '@material-ui/core';
import styles from './styles';

class SquareButton extends React.PureComponent {
  handleImageLoadend = (file, reader) => () => {
    const newImage = {
      key: 'UUID()',
      base64: reader.result,
      name: file.name,
    };
    console.log(newImage);
    this.props.onChange(newImage);
    // console.log(event);
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
      classes, children, image,
    } = this.props;
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
  image: '',
};

SquareButton.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.string,
  image: PropTypes.string,
};

export default withStyles(styles)(SquareButton);
