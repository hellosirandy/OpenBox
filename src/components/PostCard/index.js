import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withStyles, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, CardActions, Typography } from '@material-ui/core';
import * as moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import styles from './styles';

class PostCard extends React.PureComponent {
  state = {
    hovered: false,
  }
  handleMouseEnter = () => {
    this.setState({ hovered: true });
  }
  handleMouseLeave = () => {
    this.setState({ hovered: false });
  }
  handleCardClick = () => {
    const { post: { postId } } = this.props;
    this.props.history.push(`/post/${postId}`);
  }
  render() {
    const { classes, post } = this.props;
    return (
      <Card
        className={classes.container}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        raised={this.state.hovered}
        onClick={this.handleCardClick}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {post.author.name.split(' ')[0][0]}{post.author.name.split(' ')[1][0]}
            </Avatar>
          }
          // action={
          //   <IconButton>
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={post.author.name}
          subheader={moment(post.createTime).format('MMM D, h:mm a')}
        />
        <CardMedia
          className={classes.media}
          image={post.images[0]}
          title="Paella dish"
        />
        <CardContent style={{ paddingBottom: 0 }}>
          <Typography variant="h6">
            {post.title}
          </Typography>
        </CardContent>
        <CardActions style={{ paddingTop: 0 }} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(withRouter, withStyles(styles))(PostCard);
