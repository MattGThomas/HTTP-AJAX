import React from 'react'
import { Link, Route } from 'react-router-dom'
import axios from 'axios'

import './App.css';

import HomePage from './components/HomePage'
import FriendsList from './components/FriendsList'
import Friend from './components/Friend'
import NewFriend from './components/NewFriend'
import Update from './components/Update'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      friends: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/friends')
      .then(response => {
        this.setState({ friends: response.data })
      })
      .catch(err => {
        console.log('Error', err)
      })
  }

  updateFriends = (friends) => {
    this.setState({ friends })
  }

  render() {
    const { friends } = this.state
    return (
      <div className='app'>
        <nav className='navigation'>
          <h1>Your Friends List</h1>
          <div className='nav-Links'>
            <Link to='/'>Home</Link>
            <Link to='/friends'>Friends</Link>
            <Link to='/add'>New Friend</Link>
          </div>
        </nav>

        <Route path='/' exact render ={(props) => <HomePage {...props} />} />
        <Route path='/friends' exact render = {(props) => <FriendsList {...props} friends={friends} />} />
        <Route path='/friend/:id' render = {(props) => <Friend {...props} friends={friends} />} />
        <Route path='/add' exact render ={(props) => <NewFriend {...props} updateFriends={this.updateFriends} />} />
        <Route path='/update/:id' exact render={(props) => <Update {...props} updateFriends={this.updateFriends} />} />
      </div>
    )

  }
}

export default App;
