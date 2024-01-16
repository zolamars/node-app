async function notifyCUstomer() {
    const customer = await getCustomer(1);
    console.log(customer);
    if (customer.isGold) {
      const topMovies = await getTopMovies(customer);
      console.log(topMovies)
      const email = await sendEmail(customer.email, topMovies);
      console.log("Email sent...");
    }
}
notifyCUstomer();

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        email: "zool@gmail.com",
        isGold: true,
      });
    }, 4000);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["movie1", "movie2"]);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 4000);
  });
}
