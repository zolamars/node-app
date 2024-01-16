console.log("Before");

// Promise-based approach
// getUser(1)
//   .then((user) => getRepos(user.gitHubUserName))
//   .then((repos) => getCommits(repos[0]))
//   .then((commits) => console.log("commits", commits))
//   .catch(err=> console.log('Error', err.message));

// Async and Await
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepos(user.gitHubUserName);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch (err) {
    console.log("Error", err.message);
  }
}

displayCommits();
console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a db...");
      resolve({ id: id, gitHubUserName: "zolamars" });
    }, 2000);
  });
}

function getRepos(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("username", username);
      resolve(["repo1", "repo2", "repo3"]);
      // reject(new Error('Could not get the repos'))
    }, 2000);
  });
}
function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GiHub API...");
      resolve(["commit"]);
    }, 2000);
  });
}
