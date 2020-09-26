const weather = document.querySelector('.js-weather');

const API_KEY = 'a03c5c8ac480fb19951b5e967644b255';
const COORDS = 'coords';

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const minTemperature = json.main.temp_min;
      const maxTemperature = json.main.temp_max;
      const weathername = json.weather[0].main;
      weather.innerText = `${parseInt(minTemperature)}~${parseInt(
        maxTemperature
      )}°C /  ${weathername}`;
    });
}
//"main":{"temp":17.64,"feels_like":18.07,"temp_min":17,"temp_max":19,"pressure":1018,"humidity":72}
//"weather":[{"id":803,"main":"Clouds",
//"description":"broken clouds","icon":"04n"}]

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log('Cant access geo location');
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoSuccess);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    // get weather
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
