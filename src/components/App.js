import React, { Component } from 'react';
import SearchBar from './SearchBar'
import axios from 'axios';
import SearchResult from './SearchResult'
import UserInfo from './UserInfo'
import styles from './styles.module.css'
import './App.css'

const GITHUB_URL = "https://api.github.com/users/"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: '',
      user: '',
      page: 1,
      err: ''
    };
  }

  handleSubmit = (username) => {
    this.setState({events: ''})
    this.getEvents(username)
    this.getUserInfo(username)
  }

  getUserInfo = (username) => {
    axios.get(GITHUB_URL + username)
    .then(res => {
        let user = res.data;
        this.setState({user, user})
      })
    }
  getEvents = (username) => {
    axios.get(GITHUB_URL + username + '/received_events?page=' + this.state.page)
    .then(res => {
      let events = res.data;
      let event_l = [...this.state.events, events]
      this.setState({events: event_l, err: ''})
    }).catch(err => {
      this.setState({err: 'User not found!', events: '', user: ''})
    })
  }

  handleLoadButton = () => {
    const page = this.state.page + 1
    this.setState({page: page})
    this.getEvents(this.state.user.login)
  }
  render() {
      const events = this.state.events
      const user = this.state.user
      const err = this.state.err
      return (
        <div className="App">
          <nav>
            <div className="nav-wrapper green darken-1">
              <a href="#" className="brand-logo" style={{marginLeft: '20px'}}>Github User Timeline</a>
            </div>
          </nav>
          <hr/>
          <div className="container">
            <div className="row">
              <div className="col s3">
                <UserInfo user = {user} />
              </div>
              <div className="col s9">
                <SearchBar handleSubmit={this.handleSubmit} />
              {
                events && !err && events.map((event, i) => {
                  return(
                    <SearchResult events={event} page={this.state.page} username={this.state.user} />
                  )
                })
              }
              {
                events &&
                <button className="waves-effect waves-light btn orange accent-2" onClick={() => {this.handleLoadButton()}}><i className="material-icons right">cloud</i>Load...</button>
              }
              {
                err &&
                  <div>
                    User not found
                  </div>
              }
              </div>
          </div>
        </div>
        <a id="forkMe" className={styles['forkMe']} href="https://github.com/ebrugulec/timeline">View on GitHub</a>
      </div>
    );
  }
}

export default App;
