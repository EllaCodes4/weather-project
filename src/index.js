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

//Forecast
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-2">
            <div class="forecast-day">${day}</div>
            <img
              src="http://openweathermap.org/img/wn/02d@2x.png"
              class="forecast-weather-icon"
              alt=""
              width="80px"
            />
            <div class="forecast-temperatures">
              <span class="forecast-high-temperature">90</span>° /
              <span class="forecast-low-temperature">86</span>°
            </div>
          </div>
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "39b37e744d3d61db56e033dc0b8a5694";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
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
  fahrenheitTemperature = Math.round(response.data.main.temp);

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

  let humidityButton = document.querySelector("#humidity");
  humidityButton.innerHTML = `Humidity: ${humidity}%`;

  document.querySelector("#wind").innerHTML = `Wind: ${windSpeed} mph`;

  getForecast(response.data.coord);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

//Add C and F links
function showCelseiusTemperature(event) {
  event.preventDefault();
  let celseiusTemperature = Math.round(((fahrenheitTemperature - 32) * 5) / 9);
  let temperatureDisplayed = document.querySelector("#temperature");
  celseiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  fahrenheitLink.classList.add("units-link");
  temperatureDisplayed.innerHTML = `${celseiusTemperature}°`;
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureDisplayed = document.querySelector("#temperature");
  fahrenheitLink.classList.add("active");
  celseiusLink.classList.remove("active");
  temperatureDisplayed.innerHTML = `${fahrenheitTemperature}°`;
}

//VARIABLES

// Add current day, time, date
let currentDateTime = document.querySelector("#current-datetime");
let now = new Date();
currentDateTime.innerHTML = formatDate(now);

//Search VARIABLES
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//Current location button VARIABLES
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

//Add C and F links
let fahrenheitTemperature = null;

let celseiusLink = document.querySelector("#celseius-link");
celseiusLink.addEventListener("click", showCelseiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

search("New York");
