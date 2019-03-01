import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles, Grid } from '@material-ui/core';
import styles from './styles';
import NavBar from '../NavBar';
import { getPost } from '../../store/actions/post';
import PostCard from '../PostCard';

class HomePage extends React.PureComponent {
  componentDidMount() {
    this.props.onGetPost();
  }
  render() {
    const { classes, posts } = this.props;
    return (
      <div className={classes.container}>
        <NavBar />
        <div className={classes.innerContainer}>
          <Grid container spacing={16}>
            {posts.map(post => (
              <Grid item xl={2} lg={3} md={3} key={post.postId}>
                <div>
                  <PostCard post={post} />
                </div>
              </Grid>))}
          </Grid>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  onGetPost: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    posts: state.post.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetPost: () => dispatch(getPost()),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(HomePage);
