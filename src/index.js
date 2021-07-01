import { callCurrentWeatherAPI } from "./handleAPI.js";

const searchInput = document.querySelector(`#input-location`);
const submitButton = document.querySelector(`#submit-location`);
// const weatherIcon = document.querySelector(`img`);

submitButton.addEventListener(`click`, (e) => {
  e.preventDefault();
  callCurrentWeatherAPI(searchInput.value, `imperial`);
  searchInput.value = ``;
});

// default weather on page load
callCurrentWeatherAPI(`austin`, `imperial`);
