console.log("Before");
getUser(1, (user) => {
  getRepos(user.gitHubUserName, (userRepos) => {
    console.log("User Repos", userRepos);
  });
});
console.log("After");

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
