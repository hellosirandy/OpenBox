import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles, Grid } from '@material-ui/core';
import styles from './styles';
import DefaultInput from '../DefaultInput';
import NavBar from '../NavBar';
import DefaultTextField from '../DefaultTextField';
import SquareButton from '../SquareButton';
import DefaultButton from '../DefaultButton';
import { createPost } from '../../store/actions/post';
import { POST_CREATING } from '../../store/loadingTypes';
import Editor from '../Editor';

class EditItemPage extends React.PureComponent {
  state = {
    controls: {
      images: {
        value: [],
        valid: true,
      },
      title: {
        value: '',
        valid: true,
      },
      content: {
        value: '',
        valid: true,
      },
    },
  }
  handleInputChange = key => ({ target: { value } }) => {
    this.setState(prevState => ({
      ...prevState,
      controls: {
        ...prevState.controls,
        [key]: {
          ...prevState.controls[key],
          value,
        },
      },
    }));
  }
  handleImageChange = (image) => {
    this.setState(prevState => ({
      ...prevState,
      controls: {
        ...prevState.controls,
        images: {
          ...prevState.controls.images,
          // value: [...prevState.controls.images.value, image],
          value: image,
        },
      },
    }));
  }
  handleSubmitClick = async () => {
    const { controls } = this.state;
    const data = {
      title: controls.title.value,
      content: controls.content.value,
      images: [controls.images.value],
    };
    await this.props.onSubmitPost(data);
    this.props.history.push('/home');
  }
  render() {
    const { classes, isLoading } = this.props;
    const { controls: { title, content } } = this.state;
    return (
      <div>
        <NavBar />
        <div className={classes.container}>
          <div className={classes.content}>
            <DefaultInput onChange={this.handleInputChange('title')} value={title.value} label="Title" placeholder="title" />
            {/* <DefaultTextField onChange={this.handleInputChange('content')} value={content.value} label="Content" placeholder="How do you feel about it?" /> */}
            <div className={classes.imageGrid}>
              <Grid container spacing={24}>
                <Grid item xs={3}>
                  <SquareButton onChange={this.handleImageChange} />
                </Grid>
              </Grid>
            </div>
            <Editor />
            {/* <DefaultButton loading={isLoading} onClick={this.handleSubmitClick}>
              Submit
            </DefaultButton> */}
          </div>
        </div>
      </div>
    );
  }
}

EditItemPage.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmitPost: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoading: Boolean(state.ui.isLoading[POST_CREATING]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitPost: data => (dispatch(createPost(data))),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(EditItemPage);
