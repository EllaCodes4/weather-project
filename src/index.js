// Add current day, time, date
function formatDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let currentDate = now.getDate();

  let hours = now.getHours() % 12 || 12;
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `<i class="fa-solid fa-calendar-day"></i> ${day}, ${month} ${currentDate}, ${hours}:${minutes}`;
}

//Search engine
function search(city) {
  let apiKey = "39b37e744d3d61db56e033dc0b8a5694";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(updateWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

//Current Location Button
function getCurrentLocation(position) {
  let apiKey = "39b37e744d3d61db56e033dc0b8a5694";
  let unit = "imperial";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(updateWeather);
}

// Updates weather--temp, weather description, highs/lows, etc
function updateWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let weatherDescription = response.data.weather[0].description;
  let feelsLike = Math.round(response.data.main.feels_like);
  let highTemp = Math.round(response.data.main.temp_max);
  let lowTemp = Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let weatherIcon = document.querySelector("#weather-icon");

  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let temperatureDisplayed = document.querySelector("#temperature");
  temperatureDisplayed.innerHTML = `${temperature}°`;

  let currentLocation = document.querySelector("#current-location");
  currentLocation.innerHTML = `${city}`;

  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  weatherDescriptionElement.innerHTML = weatherDescription;

  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = `${feelsLike}`;

  let highTempElement = document.querySelector("#high-temp");
  highTempElement.innerHTML = `${highTemp}`;

  let lowTempElement = document.querySelector("#low-temp");
  lowTempElement.innerHTML = `${lowTemp}`;
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

function showHumidity(response) {
  let humidityButton = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
  humidityButton.innerHTML = `Humidity: ${humidity}%`;
}

function showWind(response) {
  let windSpeed = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `Wind: ${windSpeed} mph`;
}

function getHumidity(city) {
  let apiKey = "39b37e744d3d61db56e033dc0b8a5694";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showHumidity);
}

function getWind(city) {
  let apiKey = "39b37e744d3d61db56e033dc0b8a5694";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWind);
}

function handleHumidityClick(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  getHumidity(city);
}

function handleWindClick(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  getWind(city);
}

//Button group VARIABLES
let humidityButton = document.querySelector("#humidity");
humidityButton.addEventListener("click", handleHumidityClick);

let windButton = document.querySelector("#wind");
windButton.addEventListener("click", handleWindClick);

//Current location button VARIABLES
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

//Add C and F links
function showCelseiusTemperature(event) {
  event.preventDefault();
  let temperatureDisplayed = document.querySelector("#temperature");
  temperatureDisplayed.innerHTML = `32°`;
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureDisplayed = document.querySelector("#temperature");
  temperatureDisplayed.innerHTML = `90°`;
}

//VARIABLES
// Add current day, time, date
let currentDateTime = document.querySelector("#current-datetime");
let now = new Date();
currentDateTime.innerHTML = formatDate(now);

//Search VARIABLES
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//Add C and F links
let celseiusLink = document.querySelector("#celseius-link");
celseiusLink.addEventListener("click", showCelseiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
