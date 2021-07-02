import { callCurrentWeatherAPI } from "./handleAPI.js";

const searchInput = document.querySelector(`#input-location`);
const submitButton = document.querySelector(`#submit-location`);
const toggleUnits = document.querySelector(`#toggle-units`);
// const weatherIcon = document.querySelector(`img`);

submitButton.addEventListener(`click`, (e) => {
  e.preventDefault();
  callCurrentWeatherAPI(searchInput.value, `imperial`);
  searchInput.value = ``;
});

toggleUnits.addEventListener(`change`, (e) => {
  console.log(e.target.checked);
  console.log(
    e.target.parentElement.parentElement.nextElementSibling.firstElementChild
      .firstElementChild.textContent
  );

  const cityOnDisplay =
    e.target.parentElement.parentElement.nextElementSibling.firstElementChild
      .firstElementChild.textContent;
  let unitsToDisplay = `imperial`;
  if (e.target.checked) {
    unitsToDisplay = `metric`;
  }
  callCurrentWeatherAPI(cityOnDisplay, unitsToDisplay);
});

// default weather on page load
callCurrentWeatherAPI(`austin`, `imperial`);
