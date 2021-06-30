/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsMERBQTBELFNBQVM7QUFDbkUsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0RBQXdELE9BQU87QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELElBQUksT0FBTyxJQUFJO0FBQzVFLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsdUNBQXVDO0FBQ3REIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNpbnB1dC1sb2NhdGlvbmApO1xuLy8gY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGZvcm1gKTtcbmNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNzdWJtaXQtbG9jYXRpb25gKTtcbmNvbnN0IHdlYXRoZXJJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW1nYCk7XG5cbnN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY2FsbEN1cnJlbnRXZWF0aGVyQVBJKHNlYXJjaElucHV0LnZhbHVlKTtcbiAgc2VhcmNoSW5wdXQudmFsdWUgPSBgYDtcbn0pO1xuXG4vLyBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoYHN1Ym1pdGAsIChlKSA9PiB7XG4vLyAgIGUucHJldmVudERlZmF1bHQoKTtcbi8vICAgY2FsbEN1cnJlbnRXZWF0aGVyQVBJKHNlYXJjaElucHV0LnZhbHVlKTtcbi8vIH0pO1xuXG4vLyBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKGBlbnRlcmAsIChlKSA9PiB7XG4vLyAgIGUucHJldmVudERlZmF1bHQoKTtcbi8vICAgY2FsbEN1cnJlbnRXZWF0aGVyQVBJKHNlYXJjaElucHV0LnZhbHVlKTtcbi8vIH0pO1xuXG5hc3luYyBmdW5jdGlvbiBjYWxsQ3VycmVudFdlYXRoZXJBUEkobG9jYXRpb24pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2xvY2F0aW9ufSZ1bml0cz1pbXBlcmlhbCZhcHBpZD0wM2Q5OGZiYjk5Y2RkOThiZjNmMTQyY2JhNjZkNmYzNGAsXG4gICAgICB7IG1vZGU6IFwiY29yc1wiIH1cbiAgICApO1xuICAgIGNvbnN0IGN1cnJlbnRXZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIC8vIGNvbnNvbGUubG9nKGN1cnJlbnRXZWF0aGVyRGF0YSk7XG4gICAgLy8gY29uc29sZS5sb2coY3VycmVudFdlYXRoZXJEYXRhLm1haW4udGVtcCk7XG4gICAgLy8gICBjb25zdCBzZXREYXRhT2JqZWN0ID0gYXdhaXQgc2V0TG9jYXRpb25SZXF1ZXN0KGN1cnJlbnRXZWF0aGVyRGF0YSk7XG4gICAgc2V0TG9jYXRpb25SZXF1ZXN0KGN1cnJlbnRXZWF0aGVyRGF0YSk7XG4gICAgLy8gICBzZXREYXRhT2JqZWN0KCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coYGVycm9yYCk7XG4gIH1cbn1cblxuY2FsbEN1cnJlbnRXZWF0aGVyQVBJKGBhdXN0aW5gKTtcblxuZnVuY3Rpb24gc2V0TG9jYXRpb25SZXF1ZXN0KGRhdGFPYmplY3QpIHtcbiAgY29uc3QgbG9jYXRpb25SZXF1ZXN0T2JqZWN0ID0ge1xuICAgIGxhdGl0dWRlOiBkYXRhT2JqZWN0LmNvb3JkLmxhdCxcbiAgICBsb25naXR1ZGU6IGRhdGFPYmplY3QuY29vcmQubG9uLFxuICAgIGNpdHlOYW1lOiBkYXRhT2JqZWN0Lm5hbWUsXG4gICAgLy8gdGVtcDogZGF0YU9iamVjdC5tYWluLnRlbXAsXG4gICAgLy8gcmVhbEZlZWw6IGRhdGFPYmplY3QubWFpbi5mZWVsc19saWtlLFxuICAgIC8vIGh1bWlkaXR5OiBkYXRhT2JqZWN0Lm1haW4uaHVtaWRpdHksXG4gICAgLy8gZGVzYzogZGF0YU9iamVjdC53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgIC8vIGljb246IGRhdGFPYmplY3Qud2VhdGhlclswXS5pY29uLFxuICAgIC8vIHdpbmQ6IGRhdGFPYmplY3Qud2luZC5zcGVlZCxcbiAgICAvLyBzdW5yaXNlOiBkYXRhT2JqZWN0LnN5cy5zdW5yaXNlLFxuICAgIC8vIHN1bnNldDogZGF0YU9iamVjdC5zeXMuc3Vuc2V0LFxuICB9O1xuICAvLyAgIGNvbnNvbGUubG9nKGxvY2F0aW9uUmVxdWVzdE9iamVjdCk7XG4gIC8vICAgY29uc3Qgc3VucmlzZVRpbWUgPSBuZXcgRGF0ZShsb2NhdGlvblJlcXVlc3RPYmplY3Quc3VucmlzZSAqIDEwMDApO1xuICAvLyAgIGNvbnN0IHN1bnNldFRpbWUgPSBuZXcgRGF0ZShsb2NhdGlvblJlcXVlc3RPYmplY3Quc3Vuc2V0ICogMTAwMCk7XG4gIC8vICAgY29uc29sZS5sb2coc3VucmlzZVRpbWUpO1xuICAvLyAgIGNvbnNvbGUubG9nKHN1bnNldFRpbWUpO1xuICBjYWxsT25lQ2FsbEFQSShcbiAgICBsb2NhdGlvblJlcXVlc3RPYmplY3QubGF0aXR1ZGUsXG4gICAgbG9jYXRpb25SZXF1ZXN0T2JqZWN0LmxvbmdpdHVkZVxuICApO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5SWNvbihpY29uSUQpIHtcbiAgd2VhdGhlckljb24uc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7aWNvbklEfUAyeC5wbmdgO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjYWxsT25lQ2FsbEFQSShsYXQsIGxvbikge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlRnJvbU9uZUNhbGwgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvb25lY2FsbD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mZXhjbHVkZT1taW51dGVseSxhbGVydHMmdW5pdHM9aW1wZXJpYWwmYXBwaWQ9MDNkOThmYmI5OWNkZDk4YmYzZjE0MmNiYTY2ZDZmMzRgLFxuICAgICAgeyBtb2RlOiBcImNvcnNcIiB9XG4gICAgKTtcbiAgICBjb25zdCBvbmVDYWxsRGF0YSA9IGF3YWl0IHJlc3BvbnNlRnJvbU9uZUNhbGwuanNvbigpO1xuXG4gICAgY29uc29sZS5sb2cob25lQ2FsbERhdGEpO1xuICAgIC8vIGNvbnNvbGUubG9nKGN1cnJlbnRXZWF0aGVyRGF0YS5tYWluLnRlbXApO1xuICAgIC8vICAgY29uc3Qgc2V0RGF0YU9iamVjdCA9IGF3YWl0IHNldExvY2F0aW9uUmVxdWVzdChjdXJyZW50V2VhdGhlckRhdGEpO1xuICAgIC8vIHNldExvY2F0aW9uUmVxdWVzdChjdXJyZW50V2VhdGhlckRhdGEpO1xuICAgIHNldFdlYXRoZXJEYXRhT2JqZWN0KG9uZUNhbGxEYXRhKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhgZXJyb3JgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRXZWF0aGVyRGF0YU9iamVjdCh3ZWF0aGVyRGF0YSkge1xuICBjb25zdCBjdXJyZW50V2VhdGhlckRhdGEgPSB7XG4gICAgY3VycmVudFRpbWU6IHdlYXRoZXJEYXRhLmN1cnJlbnQuZHQsXG4gICAgcmVhbFRlbXA6IHdlYXRoZXJEYXRhLmN1cnJlbnQudGVtcCxcbiAgICBmZWVsc0xpZmU6IHdlYXRoZXJEYXRhLmN1cnJlbnQuZmVlbHNfbGlrZSxcbiAgICBodW1pZGl0eTogd2VhdGhlckRhdGEuY3VycmVudC5odW1pZGl0eSxcbiAgICB3aW5kOiB3ZWF0aGVyRGF0YS5jdXJyZW50LndpbmRfc3BlZWQsXG4gICAgdXZpOiB3ZWF0aGVyRGF0YS5jdXJyZW50LnV2aSxcbiAgICBkZXNjOiB3ZWF0aGVyRGF0YS5jdXJyZW50LndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgaWNvbjogd2VhdGhlckRhdGEuY3VycmVudC53ZWF0aGVyWzBdLmljb24sXG4gICAgc3VucmlzZTogd2VhdGhlckRhdGEuY3VycmVudC5zdW5yaXNlLFxuICAgIHN1bnNldDogd2VhdGhlckRhdGEuY3VycmVudC5zdW5zZXQsXG4gIH07XG4gIGNvbnN0IGN1cnJlbnRUaW1lID0gbmV3IERhdGUod2VhdGhlckRhdGEuY3VycmVudC5kdCAqIDEwMDApO1xuICBjb25zdCBzdW5yaXNlVGltZSA9IG5ldyBEYXRlKHdlYXRoZXJEYXRhLmN1cnJlbnQuc3VucmlzZSAqIDEwMDApO1xuICBjb25zdCBzdW5zZXRUaW1lID0gbmV3IERhdGUod2VhdGhlckRhdGEuY3VycmVudC5zdW5zZXQgKiAxMDAwKTtcbiAgZGlzcGxheUljb24oY3VycmVudFdlYXRoZXJEYXRhLmljb24pO1xuICBjb25zb2xlLmxvZyhjdXJyZW50V2VhdGhlckRhdGEpO1xuICBjb25zb2xlLmxvZyh7IGN1cnJlbnRUaW1lLCBzdW5yaXNlVGltZSwgc3Vuc2V0VGltZSB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=