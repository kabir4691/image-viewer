import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import './Post.css'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions';
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'

const classes = theme => ({
  card: {
    margin: '5px'
  },
  cardActions: {
    paddingLeft: 0
  },
  favoriteLiked: {
    color: 'red'
  },
  favoriteUnliked: {
    color: 'black'
  },
  addCommentInput: {
    marginRight: '16px'
  },
  avatar: {
    width: '40px',
    height: '40px',
    border: "1px solid grey"
  }
})

class Post extends Component {

  constructor(props) {
    super(props)
    this.state = {
      postData: null
    }
  }

  componentDidMount() {
    const postDataFromProps = this.props.postData;
    fetch(`https://graph.instagram.com/${postDataFromProps.id}?fields=id,media_type,media_url,username,timestamp&access_token=${localStorage.getItem('access-token')}`, { 
      headers: {
        "Accept": "application/json;charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => {
      const propsCaption = postDataFromProps.caption ? 
      postDataFromProps.caption.replace(/(\r\n|\n|\r)/gm," ") : '';

      const caption = propsCaption
        .split(' ')
        .filter(word => !(word.startsWith('#')))
        .join(' ');
        
      const hashtags = propsCaption
        .split(' ')
        .filter(word => word.startsWith("#"))
        .join(' ');

      this.setState({
        postData: {
          id: postDataFromProps.id,
          caption: caption,
          hashtags: hashtags,
          username: json.username,
          profileImageUrl: 'profile_pic_dummy.jpg',
          mediaImageUrl: json.media_url,
          postedDate: new Date(json.timestamp),
          isLiked: false,
          likeCount: Math.floor(Math.random() * 10),
          addCommentInput: '',
          comments: []
        }
      })
    })
    .catch(err => console.log({err}));
  }

  likeToggleHandler = () => {
    this.setState(state => { 
      const { postData } = this.state;
      if (postData.isLiked) {
        postData.isLiked = false;
        postData.likeCount -= 1;
        return postData;
      } else {
        postData.isLiked = true;
        postData.likeCount += 1;
        return postData;
      }
    })
  }

  addCommentInputChangeHandler = event => {
    const { postData } = this.state;
    const { value } = event.target
    postData.addCommentInput = value;
    this.setState({postData});
  }
  
  addCommentButtonHandler = event => {
    const { postData } = this.state;
    const comment = postData.addCommentInput;
    if (!comment) return;
    postData.comments.push(comment);
    postData.addCommentInput = '';
    this.setState({postData});
  }

  formatLikeCount = count => {
    return `${count} ${count == 1 ? "like" : "likes"}`
  }

  render() {
    const { classes, sourcePage } = this.props;
    const { postData } = this.state;
    if (!postData) return "Loading";
    if (sourcePage && sourcePage === 'profile') {
      return (
        <div className='profile-modal-container'>
          <img
            src={postData.mediaImageUrl}
            alt="Post Image"
            className='profile-modal-media-image'
          />
          <div className='profile-modal-details-container'>
            <CardHeader
              avatar={<Avatar 
                        className={classes.avatar}
                        alt="Profile Picture"
                        variant='circle'
                        src={postData.profileImageUrl}
                      />} 
              title={postData.username}
              disableTypography={false}
              titleTypographyProps={{variant: 'title'}}
            />
            <p className='profile-modal-username-divider'/>
            <p className='caption'>{postData.caption}</p>
            <p className='hashtags'>{postData.hashtags}</p>
            <ul className='comments-list'>
              {postData.comments && postData.comments.map(comment => (
                <li>
                  <p>
                    <strong>{postData.username}</strong>: {comment}
                  </p>
                </li>
              ))}
            </ul>
            <CardActions className={classes.cardActions}>
              { postData.isLiked 
                ? <Favorite 
                    fontSize="large"
                    className={classes.favoriteLiked}
                    onClick={this.likeToggleHandler}
                  />
                : <FavoriteBorder
                    fontSize="large"
                    className={classes.favoriteUnliked}
                    onClick={this.likeToggleHandler}
                  />
              }
              <span>{this.formatLikeCount(postData.likeCount)}</span>
            </CardActions>
            <div className='add-comment-container'>
              <FormControl 
                fullWidth 
                className={classes.addCommentInput}
              >
                <InputLabel htmlFor='add-comment-input'>Add a comment</InputLabel>
                <Input
                  type='text'
                  id='add-comment-input'
                  onChange={this.addCommentInputChangeHandler}
                  value={postData.addCommentInput} 
                />
              </FormControl>
              <Button 
                variant='contained'
                color='primary'
                onClick={this.addCommentButtonHandler}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )
    }
    return (
      <Card className={classes.card}>
        <CardHeader 
          avatar={<Avatar 
                    className={classes.avatar}
                    alt="Profile Picture"
                    variant='circle'
                    src={postData.profileImageUrl}
                  />} 
          title={postData.username}
          disableTypography={false}
          titleTypographyProps={{variant: 'title'}}
          subheader={postData.postedDate.toLocaleString()}
          subheaderTypographyProps={{variant: 'subtitle1'}}
        />
        <CardContent>
          <img
            src={postData.mediaImageUrl}
            alt="Post Image"
            className='media-image'
          />
          <hr className='media-divider'/>
          <p className='caption'>{postData.caption}</p>
          <p className='hashtags'>{postData.hashtags}</p>
          <CardActions className={classes.cardActions}>
            { postData.isLiked 
              ? <Favorite 
                  fontSize="large"
                  className={classes.favoriteLiked}
                  onClick={this.likeToggleHandler}
                />
              : <FavoriteBorder
                  fontSize="large"
                  className={classes.favoriteUnliked}
                  onClick={this.likeToggleHandler}
                />
            }
            <span>{this.formatLikeCount(postData.likeCount)}</span>
          </CardActions>
          <ul className='comments-list'>
            {postData.comments && postData.comments.map(comment => (
              <li>
                <p>
                  <strong>{postData.username}</strong>: {comment}
                </p>
              </li>
            ))}
          </ul>
          <div className='add-comment-container'>
            <FormControl 
              fullWidth 
              className={classes.addCommentInput}
            >
              <InputLabel htmlFor='add-comment-input'>Add a comment</InputLabel>
              <Input
                type='text'
                id='add-comment-input'
                onChange={this.addCommentInputChangeHandler}
                value={postData.addCommentInput} 
              />
            </FormControl>
            <Button 
              variant='contained'
              color='primary'
              onClick={this.addCommentButtonHandler}
            >
              Add
            </Button>
          </div>
        </CardContent>
      </Card> 
    )
  }
}

export default withRouter(withStyles(classes)(Post))