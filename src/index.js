function getFtemp(event) {
  event.preventDefault();
  let ftemp = document.querySelector("#degree-now");
  let temperature = `${Math.round(celsiusTemp * (9 / 5) + 32)}`;
  ftemp.innerHTML = temperature;
}
let ftemp = document.querySelector("#fahrenheit");
ftemp.addEventListener("click", getFtemp);

function getCtemp(event) {
  event.preventDefault();
  let ctemp = document.querySelector("#degree-now");
  ctemp.innerHTML = Math.round(celsiusTemp);
}

let ctemp = document.querySelector("#celsius");
ctemp.addEventListener("click", getCtemp);

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Novembe",
    "December",
  ];
  let month = months[now.getMonth()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let year = now.getFullYear();
  let currentDate = document.querySelector("#current-date");

  return `${day}, ${month} ${date} ${year} ${hours}:${minutes}`;
}

function showTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#degree-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".current-hightemp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(".current-lowtemp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector(".weather-conditions").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector("#current-icon");
  iconElement.setAttribute(
    "src",
    `http://openweatherapp.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemp = response.data.main.temp;
}

function searchCity(city) {
  let apiKey = "23dfd4fdb62616db7596711d60c872c7";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault(event);
  let city = document.querySelector("input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "23dfd4fdb62616db7596711d60c872c7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector(".currentLocation-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusTemp = 0;
searchCity("Vancouver");
