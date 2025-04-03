document.addEventListener("DOMContentLoaded", () => {
  let cityNameInputBox = document.getElementById("cityName");
  let submit = document.getElementById("submit");           
  let results = document.getElementById("results");
  let error = document.getElementById("error");
  let errorText = document.getElementById("errorText");
  // all the necessary text fields
  let description=document.getElementById("description");
  let temp=document.getElementById("temp");
  let feelsLike=document.getElementById("feelsLike");
  // over
  const Api_Key = "9673632179b91567d194552a0152ba18";
  // creating the function for just adding the submit functionality
  submit.addEventListener("click", async (e) => {
    e.preventDefault();
    const cityName = cityNameInputBox.value.trim();
    if (!cityName) return;
    try {
      const response= await fetchWeatherData(cityName);
      console.log(response);
      displayWeatherData(response);
    } catch (error) {
      displayError(error);
    }
  });

  // creating some types of functions
  async function fetchWeatherData(cityName) {
    // do some coding to fetch the weather
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${Api_Key}`;
    const response = await fetch(url);
    if(!response.ok){
        throw new Error("Response Not Founded")
    }
    const result=await response.json();
    return result;
  }
  function displayWeatherData(textToDisplay) {
    // console.log(textToDisplay);
    // do some coding to display
    results.classList.remove("hidden");
    results.classList.add("show");    
    const {name,weather,main}=textToDisplay;
    // console.log(`${name},${weather.json()},${main.json()}`)
    // resultCityName.textContent=`Weather Report to near by ${textToDisplay.name}`
    description.textContent=`Weather: ${weather[0].description}`
    temp.textContent=`Temperature: ${main.temp}`;
    feelsLike.textContent=`Feels Like: ${main.feels_like}`;
  }

  function displayError(errorLine) {
    //do some coding to show error
    error.classList.remove("hidden");
    error.classList.add("show");
    errorText.textContent = errorLine;
  }
});
