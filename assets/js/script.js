  // Display the day for current weather
  function updateDateTime() {
    var currentTime = dayjs().format('(DD/MM/YYYY)');
    $('#currentDay').html(currentTime);
  }
  updateDateTime();

  console.log(updateDateTime)

const APIKey = "ae33ce6155933dc0cae19ca26232b426";

function getWeather() {
  const apiKey = 'ae33ce6155933dc0cae19ca26232b426'; // Replace with your OpenWeatherMap API key
  const locationInput = document.getElementById('location').value;
  const weatherInfoDiv = document.getElementById('weather-info');

  // Make sure the user has entered a location
  if (locationInput.trim() === '') {
      alert('Please enter a location.');
      return;
  }

  // Construct the API URL
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&units=metric&appid=${apiKey}`;


  

  // Make the API request
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          // Handle the received weather data
          console.log(data);

          // Example: Display temperature
          const temperature = data.main.temp;
          const cityName = data.name;
          const description = data.weather[0].description;

          const weatherInfo = `Current weather in ${cityName}: ${temperature}°C, ${description}.`;
          weatherInfoDiv.textContent = weatherInfo;
      })
      .catch(error => {
          console.error('Error fetching weather data:', error);
          weatherInfoDiv.textContent = 'Error fetching weather data.';
      });
}
