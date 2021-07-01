import { formatTimestamp } from "./handleAPI";

function handleCurrentWeatherData(currentWeather) {
  displayCurrentTimesAndLocation(currentWeather);
  displayCurrentTempAndDescription(currentWeather);
  displayCurrentOtherData(currentWeather);
}

function displayCurrentTimesAndLocation(currentWeather) {
  const cityDateTimeContainer = document.querySelector(`#city-date-time`);

  const cityName = document.querySelector(`#city-name`);
  cityName.textContent = currentWeather.cityName;

  const dateAndTimesArray = formatTimestamp(
    currentWeather.currentTime,
    currentWeather.sunrise,
    currentWeather.sunset
  );

  const currentDate = document.querySelector(`#current-date`);
  const currentTime = document.querySelector(`#current-time`);
  const sunriseTime = document.querySelector(`#sunrise`);
  const sunsetTime = document.querySelector(`#sunset`);

  currentDate.textContent = dateAndTimesArray[0];
  currentTime.textContent = dateAndTimesArray[1];
  sunriseTime.textContent = dateAndTimesArray[2];
  sunsetTime.textContent = dateAndTimesArray[3];
}

function displayCurrentTempAndDescription(currentWeather) {
  const currentTemp = document.querySelector(`#current-temp`);
  const currentFeelsLike = document.querySelector(`#current-feel`);
  currentTemp.textContent = Math.round(currentWeather.realTemp);
  currentFeelsLike.textContent = Math.round(currentWeather.feelsLike);

  const currentDescription = document.querySelector(`#current-desc`);
  currentDescription.textContent = currentWeather.desc;
  const currentWeatherIcon = document.querySelector(`#current-weather-icon`);
  currentWeatherIcon.src = `http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`;
}

function displayCurrentOtherData(currentWeather) {
  const humidity = document.querySelector(`#humidity`);
  humidity.textContent = currentWeather.humidity;

  const windSpeed = document.querySelector(`#wind-speed`);
  windSpeed.textContent = Math.round(currentWeather.wind);

  const UVI = document.querySelector(`#uvi`);
  UVI.textContent = Math.round(currentWeather.uvi);
}

export { handleCurrentWeatherData };
