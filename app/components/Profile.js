import React from 'react';
import UserProfile from './GitHub/UserProfile';
import Repos from './GitHub/Repos';
import Notes from './Notes/Notes';
import Firebase from 'firebase';
import helpers from '../utils/helpers'

var Router = require('react-router');
var ReactFireMixin = require('reactfire');

var Profile = React.createClass({
  mixins: [Router.State, ReactFireMixin],
  getInitialState: function () {
    return {
      notes: [],
      bio: {},
      repos: []
    }
  },
  init: function () {
    var child = this.ref.child(this.getParams().username);
    this.bindAsArray(child, 'notes');

    helpers.getUserData(this.getParams().username)
      .then(function (userData) {
        this.setState({
          bio: userData.bio,
          repos: userData.repos
        })
      }.bind(this));
  },
  componentDidMount: function () {
    this.ref = new Firebase('https://react-notetaker12786.firebaseIO.com');
    this.init();
  },
  componentWillUnmount: function () {
    this.unbind('notes');
  },
  componentWillReceiveProps: function () {
    this.unbind('notes');
    this.init();
  },
  handleAddNote: function (newNote) {
    this.ref.child(this.getParams().username).push(newNote)
  },
  render: function () {
    var username = this.getParams().username;
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile bio={this.state.bio}/>
        </div>
        <div className="col-md-4">
          <Repos username={username} repos={this.state.repos}/>
        </div>
        <div className="col-md-4">
          <Notes username={username} notes={this.state.notes} addNote={this.handleAddNote}/>
        </div>
      </div>
    )
  }
});

export default Profile;