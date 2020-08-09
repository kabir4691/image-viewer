import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom';
import './Profile.css'
import Header from '../../common/header/Header'
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import Edit from '@material-ui/icons/Edit';
import Modal from 'react-modal'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

const classes = theme => ({
  avatar: {
    width: '144px',
    height: '144px',
    marginRight: '30px',
    border: "1px solid white"
  },
  fabEdit: {
    margin: '0 10px' 
  }
})

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      profileData: {
        username: 'kabir.travel',
        postCount: 0, 
        followerCount: 10,
        followingCount: 20,
        fullName: 'Kabir Nazir'
      },
      isEditNameModalOpen: false,
      editNameInput: ''
    }
  }

  openEditNameModalHandler = () => {
    this.setState({ isEditNameModalOpen: true })
  }

  closeEditNameModalHandler = () => {
    this.setState({ isEditNameModalOpen: false });
  }

  editNameInputChangeHandler = (event) => {
    this.setState({ editNameInput: event.target.value });
  }

  editNameSubmitHandler = (event) => {
    const { profileData, editNameInput } = this.state;
    profileData.fullName = editNameInput;
    this.setState({
      profileData,
      editNameInput: '',
    });
    this.closeEditNameModalHandler();
  }
 
  render() {
    const { profileData } = this.state;
    const { classes } = this.props; 
    const isUserLoggedIn = localStorage.getItem('access-token') !== null;
    if (!isUserLoggedIn) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <Header />
        <div className="page-container">
          <div className='profile-container'>
            <Avatar alt="Profile Picture" variant='circle' src='profile_pic_dummy.jpg' className={classes.avatar}/>
            <div className='user-info-container'>
              <span className='username'>{profileData.username}</span>
              <div className='profile-stats'>
                <span className='stat'>Posts: {profileData.postCount}</span>
                <span className='stat'>Follows: {profileData.followingCount}</span>
                <span className='stat'>Followed By: {profileData.followerCount}</span>
              </div>
              <span className='fullname'>{profileData.fullName}</span>
              <Fab color="secondary" aria-label="edit" className={classes.fabEdit}>
                <Edit onClick={this.openEditNameModalHandler}/>
                <Modal 
                  style={modalStyle}
                  ariaHideApp={false}
                  isOpen={this.state.isEditNameModalOpen}
                  contentLabel='editNameModal'
                  onRequestClose={this.closeEditNameModalHandler}>
                    <span className='edit-name-modal-title'>Edit</span>
                    <br />
                    <br />
                    <FormControl required className={classes.modalFormControl}>
                      <InputLabel htmlFor='full-name'>Full Name</InputLabel>
                      <Input 
                        type='text'
                        id='full-name'
                        onChange={this.editNameInputChangeHandler}
                        value={this.state.editNameInput} />
                    </FormControl>
                    <br />
                    <br />
                    <br />
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={this.editNameSubmitHandler}>
                        Update
                    </Button>
                </Modal>
              </Fab>
            </div>
          </div>
        </div>
      </div> 
    )
  }
}

export default withRouter(withStyles(classes)(Profile))