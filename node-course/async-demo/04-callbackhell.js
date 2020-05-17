console.log('before');
getUser(1, (user) => {
  // console.log('User', user);
  getRepositories(user.gitHubUsername, (repos) => {
    console.log('Repositories:', repos)
  })
});
console.log('after');


function getUser(id, callback) {
  setTimeout(()=>{
    console.log('Reading a user from a database...')
    callback({ id: id, gitHubUsername: 'timhobson85'})
  }, 500);
}

function getRepositories(username, callback) {
  setTimeout(()=>{
    console.log(`Listing repositories for ${username}...`)
    callback(['repo1', 'repo2', 'repo3'])
  }, 500);
}