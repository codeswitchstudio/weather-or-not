const APIKey = "ae33ce6155933dc0cae19ca26232b426";
const locationInput = document.getElementById('location');

console.log('input location', locationInput.value);

  // Display the day for current weather
  function updateDateTime() {
    var currentTime = dayjs().format('(DD/MM/YYYY)');
    $('#currentDay').html(currentTime);
  }
  updateDateTime();
  

  // console.log(updateDateTime)

//weather app
function getWeather() {
//key

// // Make sure the user has entered a location
// if (locationInput.trim() === '') {
//     alert('Please enter a location.');
//     return;
// }

// const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${APIKey}`;

// const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&units=metric&appid=${APIKey}`


const valueOfLocation = locationInput.value();
console.log(valueOfLocation);

const queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${locationInput}&limit={limit}&units=metric&appid=${APIKey}`


// ${encodeURIComponent(locationInput)

  //When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history

// Here we run our Fetch call to the OpenWeatherMap API
fetch(queryURL)
  .then(function (response) {
    // Calling .json() to access the json data stored inside the returned promise
    return response.json();
  })

  // We store all of the retrieved data inside of an object called "data"
  .then(function (data) {
    // Log the resulting object
    console.log("MYDATA",data);

    // Transfer content to HTML
    // $(".city").html("<h1>" + data.name + " Weather Details</h1>");
    // $(".wind").text("Wind Speed: " + data.wind.speed);
    // $(".humidity").text("Humidity: " + data.main.humidity);

    // Convert the temp to Celsius
    // const tempC = data.main.temp - 273.15;

    // add temp content to html
    // $(".temp").text("Temperature: " + data.main.temp);
    // $(".tempC").text("Temperature (C) " + tempC.toFixed(2));

    // Log the data in the console as well
    // console.log("Wind Speed: " + data.wind.speed);
    // console.log("Humidity: " + data.main.humidity);
    // console.log("Temperature (C): " );

  })
  .catch(function (error) {
    console.log(error);
  })
  };
