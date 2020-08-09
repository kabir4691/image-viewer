import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom';
import './Home.css'
import Post from '../post/Post'
import Header from '../../common/header/Header'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      postsData: [],
      searchValue: ""
    }
  }

  componentDidMount() {
    const url = `https://graph.instagram.com/me/media?fields=id,caption&access_token=${localStorage.getItem('access-token')}`;
    fetch(url, { 
      headers: {
        "Accept": "application/json;charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => {
      this.setState({postsData: json.data});
    })
    .catch(err => console.log({err}));
  }

  handleSearchInputChange = (event) => {
    const value = event.target.value;
    this.setState({searchValue: value});
  }

  render() {
    const { postsData } = this.state;
    const isUserLoggedIn = localStorage.getItem('access-token') !== null;
    if (!isUserLoggedIn) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <Header handleInputChange={this.handleSearchInputChange} />
        <div className="posts-grid-container">
          <GridList className="posts-grid" cols={2} spacing={16} cellHeight='auto'>
            {postsData && postsData.filter(post => {
              return (post.caption || '').toLowerCase().includes(this.state.searchValue.toLowerCase())
            })
            .map(post => (
              <GridListTile key={post.id}>
                <Post postData={post}/>
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div> 
    )
  }
}

export default withRouter(Home);