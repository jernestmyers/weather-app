import { fromUnixTime, format } from "date-fns";
import {
  handleCurrentWeatherData,
  handleForecastData,
  errorHandler,
} from "./handleDOM";

async function callCurrentWeatherAPI(location, units) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=03d98fbb99cdd98bf3f142cba66d6f34`,
      { mode: "cors" }
    );
    const currentWeatherData = await response.json();

    setLocationRequest(currentWeatherData, units);
  } catch (error) {
    errorHandler(error);
  }
}

function setLocationRequest(dataObject, units) {
  const locationRequestObject = {
    latitude: dataObject.coord.lat,
    longitude: dataObject.coord.lon,
  };
  callOneCallAPI(
    dataObject.name,
    locationRequestObject.latitude,
    locationRequestObject.longitude,
    units
  );
}

async function callOneCallAPI(city, lat, lon, units) {
  try {
    const responseFromOneCall = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=${units}&appid=03d98fbb99cdd98bf3f142cba66d6f34`,
      { mode: "cors" }
    );
    const oneCallData = await responseFromOneCall.json();

    setWeatherDataObject(city, oneCallData, units);
  } catch (error) {
    errorHandler(error);
  }
}

function setWeatherDataObject(city, weatherData, units) {
  const currentWeatherData = {
    cityName: city,
    currentTime: weatherData.current.dt,
    realTemp: weatherData.current.temp,
    feelsLike: weatherData.current.feels_like,
    humidity: weatherData.current.humidity,
    wind: weatherData.current.wind_speed,
    uvi: weatherData.current.uvi,
    desc: weatherData.current.weather[0].description,
    icon: weatherData.current.weather[0].icon,
    sunrise: weatherData.current.sunrise,
    sunset: weatherData.current.sunset,
  };
  handleCurrentWeatherData(currentWeatherData);

  let weeksForecast = [];
  for (let i = 0; i < weatherData.daily.length; i++) {
    const dailyWeather = {
      date: weatherData.daily[i].dt,
      hiTemp: weatherData.daily[i].temp.max,
      loTemp: weatherData.daily[i].temp.min,
      desc: weatherData.daily[i].weather[0].description,
      icon: weatherData.daily[i].weather[0].icon,
      precip: weatherData.daily[i].pop,
    };
    weeksForecast.push(dailyWeather);
  }
  handleForecastData(weeksForecast, units);
}

function formatCurrentDayTimestamp(timeOfNow, timeOfSunrise, timeOfSunset) {
  let formattedTimes = [];
  formattedTimes.push(
    format(new Date(fromUnixTime(arguments[0])), "eeee: MMMM d, yyyy")
  );
  for (let i = 0; i < arguments.length; i++) {
    formattedTimes.push(
      format(new Date(fromUnixTime(arguments[i])), "h:mmaaa")
    );
  }
  return formattedTimes;
}

function formatForecastTimestamp(unixCodesArray) {
  let formattedDays = [];
  formattedDays.push(`Today`);
  for (let i = 1; i < unixCodesArray.length; i++) {
    formattedDays.push(
      format(new Date(fromUnixTime(unixCodesArray[i])), "eeee")
    );
  }
  return formattedDays;
}

export {
  callCurrentWeatherAPI,
  formatCurrentDayTimestamp,
  formatForecastTimestamp,
};
