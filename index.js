function changeWeather(response) {
  let currentTemperature = document.querySelector(".temp");
  let cityElement = document.querySelector("#city");
  currentCity = response.data.city;
  cityElement.innerHTML = currentCity;
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.condition.description;

  let windDescription = document.querySelector("#wind-description");
  windDescription.innerHTML = response.data.wind.speed;

  let airTemperature = document.querySelector("#feels-like");
  airTemperature.innerHTML = Math.round(response.data.temperature.feels_like);

  let humidityDescription = document.querySelector("#humidity-description");
  humidityDescription.innerHTML = response.data.temperature.humidity;

  let time = document.querySelector("#date-and-time");
  let date = new Date(response.data.time * 1000);
  time.innerHTML = formatDate(date);

  let icon = document.querySelector("#weather-icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-emoji"/>`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes},`;
}

function searchCity(city) {
  let apiKey = "200e53818941c4eaecdf9b9fcdto6046";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".input-form");
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Johannesburg");
