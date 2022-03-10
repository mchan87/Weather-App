let celsiusTemp = null;

function getFtemp(event) {
  event.preventDefault();
  let ftempValue = document.querySelector("#degree-now");
  let temperature = `${Math.round(celsiusTemp * (9 / 5) + 32)}`;
  ftempValue.innerHTML = temperature;
  ctemp.classList.remove("active");
  ftemp.classList.add("active");
}
let ftemp = document.querySelector("#fahrenheit");
ftemp.addEventListener("click", getFtemp);

function getCtemp(event) {
  event.preventDefault();
  let ctempValue = document.querySelector("#degree-now");
  ctempValue.innerHTML = Math.round(celsiusTemp);
  ctemp.classList.add("active");
  ftemp.classList.remove("active");
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
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  let year = date.getFullYear();

  let daymonth = date.getDate();

  return `${day}, ${month} ${daymonth}, ${year} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col">
                  <h5 class="card-title days-week">${formatDay(
                    forecastDay.dt
                  )}</h5>
                  <img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" alt=""/>
                  <p class="card-text">high <span class="temp-max">${Math.round(
                    forecastDay.temp.max
                  )}
                  </span>  <br />low <span class="temp-low">${Math.round(
                    forecastDay.temp.min
                  )}
      </span></p>
            </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "23dfd4fdb62616db7596711d60c872c7";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(displayForecast);
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
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  document.querySelector(".wind-speed").innerHTML = response.data.wind.speed;
  celsiusTemp = response.data.main.temp;
  ctemp.classList.add("active");
  ftemp.classList.remove("active");

  getForecast(response.data.coord);
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

searchCity("Vancouver");
formatDate(new Date());
