var axios = require('axios');

function getGithubRepos(username) {
  return axios.get('https://api.github.com/users/' + username + '/repos');
}

function getGithubUser(username) {
  return axios.get('https://api.github.com/users/' + username);
}

var helpers = {
  getUserData: function () {
    return axios.all([getGithubRepos, getGithubUser])
      .then(function (dataArray) {
        console.log(dataArray);
        return {
          repos: dataArray[0].data,

        }
      });
  }
};

module.exports = helpers;