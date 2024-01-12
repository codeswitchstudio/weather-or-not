
const APIKey = "ae33ce6155933dc0cae19ca26232b426";



//Create a weather dashboard with form inputs.

const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=userCity&appid=${APIKey}`;

  //When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history

  fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);





  
var userCity; //user input for city name
// You'll need to adjust your application to accept user input, to store in the city variable that you've created.

//current


//future


  //When a user views the current weather conditions for that city they are presented with:
  // The city name
  // The date
  // An icon representation of weather conditions
  // The temperature
  // The humidity
  // The wind speed



// When a user views future weather conditions for that city they are presented with a 5-day forecast that displays:
  // The date
  // An icon representation of weather conditions
  // The temperature
  // The humidity

// When a user click on a city in the search history they are again presented with current and future conditions for that city
//Local storage
