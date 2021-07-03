import { callCurrentWeatherAPI } from "./handleAPI.js";
import { toggleUnitsDisplayed } from "./handleDOM.js";

const searchInput = document.querySelector(`#input-location`);
const submitButton = document.querySelector(`#submit-location`);
const toggleUnits = document.querySelector(`#toggle-units`);

toggleUnits.addEventListener(`change`, toggleUnitsDisplayed);

submitButton.addEventListener(`click`, (e) => {
  e.preventDefault();
  if (!toggleUnits.checked) {
    callCurrentWeatherAPI(searchInput.value, `imperial`);
  } else {
    callCurrentWeatherAPI(searchInput.value, `metric`);
  }
  searchInput.value = ``;
});

// default weather on page load
callCurrentWeatherAPI(`austin`, `imperial`);
