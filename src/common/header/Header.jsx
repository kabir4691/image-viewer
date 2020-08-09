import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './Header.css'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Search from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover'
import MenuItem from '@material-ui/core/MenuItem'

const classes = theme => ({
  searchContainer: {
    borderRadius: '4px',
    backgroundColor: '#c0c0c0',
    width: '280px',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyItems: 'center',
    padding: '0 10px',
    margin: '0 10px'
  }, 
  searchIcon: {
    width: '30px'
  },
  searchBar: {
    width: '100%'
  },
  avatar: {
    width: '30px',
    height: '30px',
    margin: '0 10px',
    border: "1px solid white"
  }
})

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverAnchor: null
    }
  }

  handleAvatarClick = (event) => {
    this.setState({popoverAnchor: event.currentTarget})
  }

  handlePopoverClose = () => {
    this.setState({popoverAnchor: null})
  }

  navigateToMyAccount = () => {
    this.handlePopoverClose();
    this.props.history.push('/profile')
  }

  logoutUser = () => {
    localStorage.removeItem('access-token');
    this.handlePopoverClose();
    this.props.history.push('/');
  }

  render() {
    const { classes, location } = this.props;
    const isUserLoggedIn = localStorage.getItem('access-token') !== null;
    return (
      <div className='app-header'>
        <Link to="/home">
          <span className='app-logo'>Image Viewer</span>
        </Link>
        { 
          isUserLoggedIn &&
            <div className='menu-container'>
              { 
                location.pathname === "/home" && 
                  <div className={classes.searchContainer}>
                    <div className={classes.searchIcon}>
                      <Search />
                    </div>
                    <Input className={classes.searchBar} disableUnderline placeholder="Search..." onChange={this.props.handleInputChange}/>
                  </div>
              }
              <IconButton size='small' onClick={this.handleAvatarClick}>
                <Avatar alt="Profile Picture" variant='circle' src='profile_pic_dummy.jpg' className={classes.avatar}/>
              </IconButton>
              <Popover
                id="avatar-popover"
                className={classes.popover}
                open={Boolean(this.state.popoverAnchor)}
                anchorEl={this.state.popoverAnchor}
                onClose={this.handlePopoverClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}>
                  <div className="popover-menu">
                    { 
                      location.pathname === "/home" && 
                        <Fragment>
                          <MenuItem onClick={this.navigateToMyAccount}>My Account</MenuItem>
                          <hr className="popover-menu-divider"/>
                        </Fragment>
                    }
                    <MenuItem onClick={this.logoutUser}>Logout</MenuItem>
                  </div>
              </Popover>
            </div>
        }
      </div>
    )
  }
}

export default withRouter(withStyles(classes)(Header))