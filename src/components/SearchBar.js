import React, { Component } from 'react';

class SearcBar extends Component {
    state = {
        username: ''
    }
   handleChange = (e) => {
       this.setState({username: e.target.value})
       
   }

   _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.handleSubmit(this.state.username)
    }
  }

   handleSearchButton = () => {
    this.props.handleSubmit(this.state.username)
   }
  render() {
    return (
      <div className="row">
        <div className="input-field col s4">
            <input type="text" onKeyPress={this._handleKeyPress} placeholder="Github Username" autoFocus={true} value={this.state.username} name="name" onChange={this.handleChange}  />
        </div>
        <div className="input-field col s4">
          <button className="waves-effect waves-light btn orange accent-2" onClick={() => {this.handleSearchButton()}}><i className="material-icons right">public</i>Search</button>
        </div>
      </div>
    );
  }
}

export default SearcBar;
