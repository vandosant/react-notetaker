var React = require('react');
var Router = require('react-router');

var Profile = React.createClass({
  render: function () {
    return (
      <div className="row">
        <div className="col-md-4">
          User Profile
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