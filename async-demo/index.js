console.log("Before");
getUser(1, getUserRepos);
console.log("After");

function getUserRepos(user){
    console.log("User Repos", user);
    getRepos(user.gitHubUserName, getUserCommits)
}
function getUserCommits(repos){
    console.log("User Repos", repos);
    getCommits(repo, displayCommits)
}

function displayCommits(commits){
    console.log(commits)
}

function getUser(id) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
          console.log("Reading a user from a db...");
          resolve({ id: id, gitHubUserName: "zolamars" });
        }, 2000);
    })
}

function getRepos(username) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
          console.log("username", username);
          resolve(["repo1", "repo2", "repo3"]);
        }, 2000);
    })
}
function getCommits(repo){
    return new Promise((resolve, reject  )=>{
        setTimeout(()=>{
            console.log('Calling GiHub API...')
            resolve(['commit'])
        },2000)
    })
}
