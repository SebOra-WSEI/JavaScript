const form = document.querySelector("#form");
const submitButton = document.querySelector("#submitBtn");
const weatherElement = document.querySelector("#weather");
const cityInput = document.querySelector("#cityInput");

const API_KEY = "4cfd4ba1c34f4042910ca3cf0d5e122b";

submitButton.addEventListener('click', (e) => {
  if (cityInput.value === '') {
    alert('City cannot be empty');
    return;
  }

  e.preventDefault();
  handleSubmit(cityInput.value);
  cityInput.value = "";
})

const main = () => {
  const cities = localStorage.getItem("cities") ?? [];
  const parsed = JSON.parse(cities)
  parsed.forEach((city) => displayCityWeather(city));
};

const fetchCityWeather = async (city) => {
  if (!city) {
    return;
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  )
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.log(err))

  return response;
};

const removeCity = (cityToRemove) => {
  const cities = JSON.parse(localStorage.getItem("cities"));
  const newCities = cities.filter((city) => city !== cityToRemove);
  localStorage.setItem("cities", JSON.stringify(newCities));

  while (weatherElement.firstChild) {
    weatherElement.removeChild(weatherElement.firstChild);
  }

  main();
};

async function displayCityWeather(city) {
  if (!city) {
    return;
  }

  const weather = await fetchCityWeather(city);
  const { main, weather: weatherIcon } = weather ?? {};

  if (!main || !weather) {
    return;
  }

  const { temp, humidity } = main;
  const { icon } = weatherIcon[0];

  const cityWeatherWrapper = document.createElement("div");
  cityWeatherWrapper.className = "cityWeather";

  const cityNameElement = document.createElement("p");
  const cityName = city.split(' ').map(a => a[0].toUpperCase() + a.slice(1));
  cityNameElement.innerHTML = cityName.join(' ');
  cityWeatherWrapper.appendChild(cityNameElement);

  const temperatureElement = document.createElement("p");
  temperatureElement.innerHTML = `Temperatura: ${temp}°C`;
  cityNameElement.appendChild(temperatureElement);

  const humididtyElement = document.createElement("p");
  humididtyElement.innerHTML = `Wilgotność: ${humidity}%`;
  temperatureElement.appendChild(humididtyElement);

  const iconElement = document.createElement("img");
  iconElement.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  temperatureElement.appendChild(iconElement);

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.className = 'removeBtn';
  removeButton.addEventListener('click', () => removeCity(city))

  cityWeatherWrapper.appendChild(removeButton);

  weatherElement.appendChild(cityWeatherWrapper);
};

function handleSubmit(city) {
  if (!localStorage.getItem("cities")) {
    const cities = [city];
    localStorage.setItem("cities", JSON.stringify(cities));
  } else {
    const cities = JSON.parse(localStorage.getItem("cities"));

    cities.push(city)

    localStorage.setItem("cities", JSON.stringify(cities));
  }

  displayCityWeather(city);
};

main();