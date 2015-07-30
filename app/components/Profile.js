var React = require('react');
var Router = require('react-router');

var Profile = React.createClass({
  mixins: [Router.State],
  getInitialState: function () {
    return {
      notes: [],
      bio: {},
      repos: []
    }
  },
  render: function () {
    var username = this.getParams().username;
    return (
      <div className="row">
        <div className="col-md-4">
          User Profile {username}
        </div>
        <div className="col-md-4">
          Repos
        </div>
        <div className="col-md-4">
          Notes
        </div>
      </div>
    )
  }
});

module.exports = Profile;