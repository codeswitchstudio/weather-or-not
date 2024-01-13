var APIkey = '52295644386b9059a3d034279446c259';

var todayEl = document.getElementById('today');
var forecastEl = document.getElementById('forecast');
var historyEl = document.getElementById('history');

var locationValue = document.getElementById('location').value.trim(); 


var searchButton = document.getElementById('search-button');


function fetchWeather(location) {
  var { lat } = location;
  var { lon } = location;
  var city = location.name;

  var apiUrl =
  `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${APIkey}&units=metric;`

  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderItems(city, data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

  // fetch(requestUrl)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     console.log(data);
  //     $('#search-city').val('')
      //temp
      var temp = document.createElement('div');
      temp.textContent = "Temp: " + data.main.temp + " F";
      temp.classList = "current-list-group";

      //search city
      var cityEl = document.createElement('h3');
      cityEl.textContent = data.name;
      //humidity
      var humidity = document.createElement('div');
      humidity.textContent = "Humidity: " + data.main.humidity + "% ";
      humidity.classList = "current-list-group";
      //wind speed
      var windSpeed = document.createElement('div');
      windSpeed.textContent = "Wind Speed: " + data.wind.speed + "mph ";
      windSpeed.classList = "current-list-group";
      //weather icon next to city
      var weatherIcon = document.createElement("img")
      weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      cityEl.appendChild(weatherIcon);

      var currentDate = document.createElement("div")
      currentDate.textContent = " (" + moment(data.value).calendar("MMM D, YYYY") + ") ";
      cityEl.appendChild(currentDate);

      //put all var into container
      containerWeather.innerHTML = '';
      containerWeather.append(cityEl, temp, humidity, windSpeed);
      var lon = data.coord.lon;
      var lat = data.coord.lat;
      getUv(lat, lon);
      //cities in search on left side

      var searchNameEl = document.createElement('h3')
      searchNameEl.textContent = data.name;
      window.localStorage.setItem("h2", data.name);
      window.localStorage.getItem("h2");
      historyContainer.append(searchNameEl);

    });


// five day forecast
function getForecast() {

  var searchValue = document.getElementById('location').value;
  var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=metric&appid=${APIkey}`;

  fetch(fiveDayUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {

      forecastContainer.innerHTML = '';
      for (let i = 0; i < data.list.length; i += 8) {
        var div = document.createElement("div");
        div.style.display = "inline-block";
        div.setAttribute('class', 'col-md-2  col-sm-4')


        //date
        var fivecurrentDate = document.createElement("div")
        fivecurrentDate.textContent = moment(data.list[i].dt_txt).calendar("MMM D, YYYY");


        var temp5 = document.createElement('div');
        temp5.textContent = "Temp: " + data.list[i].main.temp + " F";
        temp5.classList = "five-day-list-group";



        //humidity
        var fivehumidity = document.createElement('div');
        fivehumidity.textContent = "Humidity: " + data.list[i].main.humidity + "% ";
        fivehumidity.classList = "five-day-list-group";


        //pic icon for weather
        var pic = data.list[i].weather[0].icon
        var fiveweatherIcon = document.createElement("img")
        fiveweatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${pic}@2x.png`);
        fivehumidity.appendChild(fiveweatherIcon);


        temp5.appendChild(fivehumidity);
        fivecurrentDate.appendChild(temp5);
        div.appendChild(fivecurrentDate);
        forecastContainer.appendChild(div);

      }

    })


}

searchButton.addEventListener('click', getApi);
searchButton.addEventListener('click', getForecast);
window.addEventListener("load", function () {
  window.localStorage.getItem("history")
})

