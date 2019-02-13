import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withStyles, Grid } from '@material-ui/core';
import styles from './styles';
import DefaultInput from '../DefaultInput';
import NavBar from '../NavBar';
import DefaultTextField from '../DefaultTextField';
import SquareButton from '../SquareButton';
import DefaultButton from '../DefaultButton';
import { createPost } from '../../store/actions/post';

class EditItemPage extends React.PureComponent {
  state = {
    controls: {
      images: {
        value: [],
        valid: true,
      },
    },
  }
  handleImageChange = (image) => {
    this.setState(prevState => ({
      ...prevState,
      controls: {
        ...prevState.controls,
        images: {
          ...prevState.controls.images,
          value: [...prevState.controls.images.value, image],
        },
      },
    }));
  }
  handleSubmitClick = () => {
    console.log(this.state.controls.images);
    this.props.onSubmitPost(this.state.controls.images.value[0]);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <NavBar />
        <div className={classes.container}>
          <div className={classes.content}>
            <DefaultInput label="Title" placeholder="title" />
            <DefaultTextField label="Content" placeholder="How do you feel about it?" />
            <div>
              <Grid container spacing={24}>
                <Grid item xs={3}>
                  <SquareButton onChange={this.handleImageChange} />
                </Grid>
              </Grid>
            </div>
            <DefaultButton onClick={this.handleSubmitClick}>Submit</DefaultButton>
          </div>
        </div>
      </div>
    );
  }
}

EditItemPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitPost: image => (dispatch(createPost(image))),
  };
};

export default compose(
  connect(null, mapDispatchToProps),
  withStyles(styles),
)(EditItemPage);
