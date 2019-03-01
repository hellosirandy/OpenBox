import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import { getSinglePost } from '../../store/actions/post';
import NavBar from '../NavBar';

class PostPage extends React.PureComponent {
  componentDidMount() {
    const { post, onGetSinglePost } = this.props;
    if (Object.keys(post).length === 0) {
      onGetSinglePost();
    }
  }
  render() {
    const { classes, post } = this.props;
    return (
      <div className={classes.container}>
        <NavBar />
      </div>
    );
  }
}

PostPage.defaultProps = {
  post: {},
};

PostPage.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object,
  onGetSinglePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
  const { match: { params: { postId } } } = props;
  return {
    post: state.post.postDict[postId],
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { match: { params: { postId } } } = props;
  return {
    onGetSinglePost: () => dispatch(getSinglePost(postId)),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(PostPage);
