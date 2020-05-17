console.log('before');
getUser(1, getRepositories);
console.log('after');


function getRepositories(user) {
  getRepositories(user.gitHubUsername, getCommits);
};
function getCommits(repos) {
  getCommits(repo, displayCommits);
};
function displayCommits(commits) {
  console.log(commits);
};


function getUser(id, callback) {
  setTimeout(()=>{
    console.log('Reading a user from a database...')
    callback({ id: id, gitHubUsername: 'timhobson85'})
  }, 500);
};

function getRepositories(username, callback) {
  setTimeout(()=>{
    console.log(`Listing repositories for ${username}...`)
    callback(['repo1', 'repo2', 'repo3'])
  }, 500);
};