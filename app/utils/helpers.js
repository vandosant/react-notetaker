var axios = require('axios');

function getGithubRepos(username) {
  return axios.get('https://api.github.com/users/' + username + '/repos');
}

function getGithubUser(username) {
  return axios.get('https://api.github.com/users/' + username);
}

var helpers = {
  getUserData: function (username) {
    return axios.all([getGithubRepos(username), getGithubUser(username)])
      .then(function (dataArray) {
        return {
          repos: dataArray[0].data,
          bio: dataArray[1].data
        }
      });
  }
};

module.exports = helpers;