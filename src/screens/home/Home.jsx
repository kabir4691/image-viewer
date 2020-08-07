import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom';
import './Home.css'
import Header from '../../common/header/Header'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      postsData: []
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

  render() {
    const { props } = this;
    const { postsData } = this.state;
    if (!(props && props.location && props.location.state && props.location.state.userLoggedIn)) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <Header />
        <div className="post-grid-container">
          <GridList cols={2}>
            {postsData && postsData.map(post => (
              <GridListTile className='post-grid-item' key={post.id}>
                
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div> 
    )
  }
}

export default withRouter(Home);