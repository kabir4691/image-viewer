import React, { Component } from 'react'
import './Header.css'

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: localStorage.getItem('access-token') !== null
    }
  }

  render() {
    return (
      <div className='app-header'>
        <span className='app-logo'>Image Viewer</span>
      </div>
    )
  }
}