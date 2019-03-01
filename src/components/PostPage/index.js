import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as moment from 'moment';
import { compose } from 'recompose';
import { withStyles, Typography, Grid, CardHeader, Avatar } from '@material-ui/core';
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
      <div>
        <NavBar />
        <div className={classes.container}>
          {Object.keys(post).length !== 0 && (
            <div className={classes.innerContainer}>
              <Grid container spacing={24}>
                <Grid item xs={4} className={classes.titleWrapper}>
                  <div>
                    <Typography className={classes.title} variant="h1">{post.title}</Typography>
                    <CardHeader
                      style={{ paddingLeft: 0 }}
                      avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                          {post.author.name.split(' ')[0][0]}{post.author.name.split(' ')[1][0]}
                        </Avatar>
                      }
                      title={post.author.name}
                      subheader={moment(post.createTime).format('MMM D, h:mm a')}
                    />
                  </div>
                </Grid>
                <Grid item xs={8}>
                  <div className={classes.imageGrid} style={{ backgroundImage: `url(${post.images[0]})` }} />
                </Grid>
              </Grid>
              <div className={classes.content}>
                <div className={classes.contentInner}>
                  {post.content.split('\n').map((paragraph, idx) => (
                    <Typography
                      className={classes.paragraph}
                      paragraph
                      key={idx}
                    >{paragraph}
                    </Typography>
                ))}
                </div>
              </div>
            </div>
          )}
        </div>
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
