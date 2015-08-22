var React = require('react');

var UserProfile = React.createClass({
  render: function () {
    return (
      <div>
        <h3>User Profile </h3>
        <ul className="list-group">
          {this.props.bio.avatar_url && <li className="list-group-item"><img className="img-thumbnail" src={this.props.bio.avatar_url} /></li>}
          {this.props.bio.name && <li className="list-group-item">{this.props.bio.name}</li>}
          {this.props.bio.login && <li className="list-group-item">{this.props.bio.login}</li>}
          {this.props.bio.email && <li className="list-group-item">{this.props.bio.email}</li>}
          {this.props.bio.location && <li className="list-group-item">{this.props.bio.location}</li>}
          {this.props.bio.followers && <li className="list-group-item">{this.props.bio.followers}</li>}
          {this.props.bio.following && <li className="list-group-item">{this.props.bio.following}</li>}
          {this.props.bio.repos && <li className="list-group-item">{this.props.bio.repos}</li>}
          {this.props.bio.blog && <li className="list-group-item">{this.props.bio.blog}</li>}
        </ul>
      </div>
    )
  }
});

module.exports = UserProfile;