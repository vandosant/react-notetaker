import React from 'react';
import UserProfile from './GitHub/UserProfile';
import Repos from './GitHub/Repos';
import Notes from './Notes/Notes';
import Firebase from 'firebase';
import helpers from '../utils/helpers'
import Rebase from 're-base';

var base = Rebase.createClass('https://react-notetaker12786.firebaseio.com');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      bio: {},
      repos: []
    }
  }

  init() {
    this.ref = base.bindToState(this.context.router.getCurrentParams().username, {
      context: this,
      state: 'notes',
      asArray: true
    });

    helpers.getUserData(this.context.router.getCurrentParams().username)
      .then((userData) => {
        this.setState({
          bio: userData.bio,
          repos: userData.repos
        })
      });
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillReceiveProps() {
    base.removeBinding(this.ref);
    this.init();
  }

  handleAddNote(newNote) {
    base.post(this.context.router.getCurrentParams().username, {
      data: this.state.notes.concat([newNote])
    })
  }

  render() {
    var username = this.context.router.getCurrentParams().username;
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile bio={this.state.bio}/>
        </div>
        <div className="col-md-4">
          <Repos username={username} repos={this.state.repos}/>
        </div>
        <div className="col-md-4">
          <Notes username={username} notes={this.state.notes} addNote={this.handleAddNote.bind(this)}/>
        </div>
      </div>
    )
  }
}

Profile.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Profile;