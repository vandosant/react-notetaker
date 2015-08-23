var React = require('react');
var Router = require('react-router');
var UserProfile = require('./GitHub/UserProfile');
var Repos = require('./GitHub/Repos');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var helpers = require('../utils/helpers');

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

module.exports = Profile;