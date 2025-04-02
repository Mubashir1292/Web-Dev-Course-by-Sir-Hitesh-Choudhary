function fakeApis() {
  return fetch("https://jsonplaceholder.typicode.com/todos/1").then(
    (response) => response.json()
  );
}
async function calling() {
  try {
    const data = await fakeApis();
    console.log(`Data: ${data}`);
  } catch (error) {
    console.log(error);
  }
}
calling();
