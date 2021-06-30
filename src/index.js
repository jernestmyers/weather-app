const searchInput = document.querySelector(`#input-location`);
// const form = document.querySelector(`form`);
const submitButton = document.querySelector(`#submit-location`);
const weatherIcon = document.querySelector(`img`);

submitButton.addEventListener(`click`, (e) => {
  e.preventDefault();
  callCurrentWeatherAPI(searchInput.value);
  searchInput.value = ``;
});

// form.addEventListener(`submit`, (e) => {
//   e.preventDefault();
//   callCurrentWeatherAPI(searchInput.value);
// });

// searchInput.addEventListener(`enter`, (e) => {
//   e.preventDefault();
//   callCurrentWeatherAPI(searchInput.value);
// });

async function callCurrentWeatherAPI(location) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=03d98fbb99cdd98bf3f142cba66d6f34`,
      { mode: "cors" }
    );
    const currentWeatherData = await response.json();

    // console.log(currentWeatherData);
    // console.log(currentWeatherData.main.temp);
    //   const setDataObject = await setLocationRequest(currentWeatherData);
    setLocationRequest(currentWeatherData);
    //   setDataObject();
  } catch (error) {
    console.log(`error`);
  }
}

callCurrentWeatherAPI(`austin`);

function setLocationRequest(dataObject) {
  const locationRequestObject = {
    latitude: dataObject.coord.lat,
    longitude: dataObject.coord.lon,
    cityName: dataObject.name,
    // temp: dataObject.main.temp,
    // realFeel: dataObject.main.feels_like,
    // humidity: dataObject.main.humidity,
    // desc: dataObject.weather[0].description,
    // icon: dataObject.weather[0].icon,
    // wind: dataObject.wind.speed,
    // sunrise: dataObject.sys.sunrise,
    // sunset: dataObject.sys.sunset,
  };
  //   console.log(locationRequestObject);
  //   const sunriseTime = new Date(locationRequestObject.sunrise * 1000);
  //   const sunsetTime = new Date(locationRequestObject.sunset * 1000);
  //   console.log(sunriseTime);
  //   console.log(sunsetTime);
  callOneCallAPI(
    locationRequestObject.latitude,
    locationRequestObject.longitude
  );
}

function displayIcon(iconID) {
  weatherIcon.src = `http://openweathermap.org/img/wn/${iconID}@2x.png`;
}

async function callOneCallAPI(lat, lon) {
  try {
    const responseFromOneCall = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=imperial&appid=03d98fbb99cdd98bf3f142cba66d6f34`,
      { mode: "cors" }
    );
    const oneCallData = await responseFromOneCall.json();

    console.log(oneCallData);
    // console.log(currentWeatherData.main.temp);
    //   const setDataObject = await setLocationRequest(currentWeatherData);
    // setLocationRequest(currentWeatherData);
    setWeatherDataObject(oneCallData);
  } catch (error) {
    console.log(`error`);
  }
}

function setWeatherDataObject(weatherData) {
  const currentWeatherData = {
    currentTime: weatherData.current.dt,
    realTemp: weatherData.current.temp,
    feelsLife: weatherData.current.feels_like,
    humidity: weatherData.current.humidity,
    wind: weatherData.current.wind_speed,
    uvi: weatherData.current.uvi,
    desc: weatherData.current.weather[0].description,
    icon: weatherData.current.weather[0].icon,
    sunrise: weatherData.current.sunrise,
    sunset: weatherData.current.sunset,
  };
  const currentTime = new Date(weatherData.current.dt * 1000);
  const sunriseTime = new Date(weatherData.current.sunrise * 1000);
  const sunsetTime = new Date(weatherData.current.sunset * 1000);
  displayIcon(currentWeatherData.icon);
  console.log(currentWeatherData);
  console.log({ currentTime, sunriseTime, sunsetTime });
}
