import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' 
import Login from './login/Login'
import Home from './home/Home'
import Profile from './profile/Profile'
import Error404 from './error404/Error404'

export default class extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route>
            <Error404 />
          </Route>
        </Switch>
      </Router>
    )
  }
}