import {
  callCurrentWeatherAPI,
  formatCurrentDayTimestamp,
  formatForecastTimestamp,
} from "./handleAPI";

function handleCurrentWeatherData(currentWeather) {
  displayCurrentTimesAndLocation(currentWeather);
  displayCurrentTempAndDescription(currentWeather);
  displayCurrentOtherData(currentWeather);
}

function displayCurrentTimesAndLocation(currentWeather) {
  const cityName = document.querySelector(`#city-name`);
  cityName.textContent = currentWeather.cityName;

  const dateAndTimesArray = formatCurrentDayTimestamp(
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

function handleForecastData(forecast, units) {
  const formattedDaysArray = getFormattedDays(forecast);
  displayForecast(forecast, formattedDaysArray, units);
}

function getFormattedDays(weatherForecast) {
  const unixCodes = weatherForecast.map((day) => {
    return day.date;
  });
  const formattedDays = formatForecastTimestamp(unixCodes);
  return formattedDays;
}

function displayForecast(weatherForecast, daysArray, units) {
  const forecastContainer = document.querySelector(`#forecast-container`);
  forecastContainer.innerHTML = ``;
  weatherForecast.forEach((day, index) => {
    const dayContainer = document.createElement(`div`);
    dayContainer.classList.add(`daily-container`);
    const dayToDisplay = document.createElement(`h3`);
    dayToDisplay.textContent = daysArray[index];
    dayContainer.appendChild(dayToDisplay);

    const hiTempAndLoTempArray = [day.hiTemp, day.loTemp];
    const temperatureContainer = document.createElement(`div`);
    for (let i = 0; i < hiTempAndLoTempArray.length; i++) {
      temperatureContainer.classList.add(`temp-container`);
      const temperature = document.createElement(`p`);
      temperature.classList.add(`forecast-temperature`);
      const unitsToDisplay = document.createElement(`p`);
      temperature.textContent = Math.round(hiTempAndLoTempArray[i]);
      if (units === `imperial`) {
        unitsToDisplay.innerHTML = "&#176F";
      } else {
        unitsToDisplay.innerHTML = "&#176C";
      }
      unitsToDisplay.classList.add(`degrees`);
      temperatureContainer.appendChild(temperature);
      temperatureContainer.appendChild(unitsToDisplay);
      if (i === 0) {
        const spacer = document.createElement(`p`);
        spacer.innerHTML = `&nbsp/&nbsp`;
        temperatureContainer.appendChild(spacer);
      }
    }
    dayContainer.appendChild(temperatureContainer);

    const dailyWeatherIcon = document.createElement(`img`);
    dailyWeatherIcon.src = `http://openweathermap.org/img/wn/${day.icon}@2x.png`;
    dayContainer.appendChild(dailyWeatherIcon);

    const dailyDescription = document.createElement(`p`);
    dailyDescription.classList.add(`daily-description`);
    dailyDescription.textContent = day.desc;
    dayContainer.appendChild(dailyDescription);

    const dailyRainChance = document.createElement(`p`);
    dailyRainChance.textContent = `Rain: ${Math.round(day.precip * 100)}%`;
    dayContainer.appendChild(dailyRainChance);

    forecastContainer.appendChild(dayContainer);
  });
}

function toggleUnitsDisplayed(event) {
  const cityOnDisplay =
    event.target.parentElement.parentElement.nextElementSibling
      .firstElementChild.firstElementChild.textContent;
  let unitsToDisplay = `imperial`;
  let unitsToHide = `metric`;
  if (event.target.checked) {
    unitsToDisplay = `metric`;
    unitsToHide = `imperial`;
  }
  toggleUnitsForCurrentWeather(unitsToDisplay, unitsToHide);
  callCurrentWeatherAPI(cityOnDisplay, unitsToDisplay);
}

function toggleUnitsForCurrentWeather(showElement, hideElement) {
  const toggleOn = document.querySelectorAll(`.${showElement}`);
  const toggleOff = document.querySelectorAll(`.${hideElement}`);
  toggleOn.forEach((element) => {
    element.style.display = `block`;
  });
  toggleOff.forEach((element) => {
    element.style.display = `none`;
  });
}

export { handleCurrentWeatherData, handleForecastData, toggleUnitsDisplayed };
