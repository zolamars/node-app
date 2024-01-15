console.log("Before");
// const test = 
getUser(1, getUserRepos);
console.log("After");

function getUserRepos(user){
    console.log("User Repos", user);
    getRepos(user.gitHubUserName, getUserCommits)
}
function getUserCommits(repos){
    console.log("User Repos", repos);
    // getCommits(repo, displayCommits)
}

function displayCommits(commits){
    console.log(commits)
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a db...");
    callback({ id: id, gitHubUserName: "zolamars" });
  }, 2000);
}

function getRepos(username, callback) {
  setTimeout(() => {
    console.log("username", username);
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
