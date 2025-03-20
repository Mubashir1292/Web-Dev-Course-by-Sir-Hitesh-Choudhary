function bookSlot() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve("Data Fetched Successfully");
      } else {
        reject("Failed to fetch");
      }
    }, 2000);
  });
}
bookSlot()
  .then((data) => {
    console.log(data);
    return data.toLowerCase();
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
