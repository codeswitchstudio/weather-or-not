
const weatherContainer = document.getElementById('weather');
const forecastContainer = document.getElementById('five-day');
const historyContainer = document.getElementById('history');
const searchButton = document.getElementById('search-button');
const APIKey = 'ae33ce6155933dc0cae19ca26232b426';
const currDate = dayjs().format('dddd, DD MMMM YYYY');
// const currTime = dayjs().format('(YYYY-MM-DD HH:MM:SS)')


function getApi() {
  const searchValue = document.getElementById('search-city').value;

  const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${APIKey}&units=metric`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      $('#search-city').val('')

      //temperature
      var temp = document.createElement('div');
      temp.textContent = "Temp: " + data.main.temp + " C";
      temp.classList = "current-list-group";

      //location
      var cityEl = document.createElement('h3');
      cityEl.textContent = data.name;

      //humidity element
      var humidity = document.createElement('div');
      humidity.textContent = "Humidity: " + data.main.humidity + "% ";
      humidity.classList = "current-list-group";

      //wind speed
      var windSpeed = document.createElement('div');
      windSpeed.textContent = "Wind Speed: " + data.wind.speed + "mph ";
      windSpeed.classList = "current-list-group";

      //icons
      var weatherIcon = document.createElement("img")
      weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      cityEl.appendChild(weatherIcon);

      var currentDate = document.createElement("div")
      currentDate.textContent = dayjs().format('DD MMMM YYYY') ; 
      cityEl.appendChild(currentDate);

      //put all var into container
      weatherContainer.innerHTML = '';

      weatherContainer.append(cityEl, temp, humidity, windSpeed);

      var lon = data.coord.lon;
      var lat = data.coord.lat;

      //recent searches in aside section
      var searchNameEl = document.createElement('h3')
      searchNameEl.textContent = data.name;
      window.localStorage.setItem("h2", data.name);
      window.localStorage.getItem("h2");
      historyContainer.append(searchNameEl);

    });


}

// five day forecast
function getFiveDay() {

  var searchValue = document.getElementById('search-city').value;

  var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=metric&appid=${APIKey}`;

  

  fetch(fiveDayUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      forecastContainer.innerHTML = '';

      
      for (let i = 0; i < data.list.length; i += 8) {
      
        var div = document.createElement("div");
        div.style.display = "inline-block";
        div.setAttribute('class', 'col-md-2  col-sm-4')


        //date
        var fivecurrentDate = document.createElement("div")
        fivecurrentDate.textContent = dayjs(data.list[i].dt_txt).format("DD MMM YYYY");


        var temp5 = document.createElement('div');
        temp5.textContent = "Temp: " + data.list[i].main.temp + " C";
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
searchButton.addEventListener('click', getFiveDay);
window.addEventListener("load", function () {
window.localStorage.getItem("history")
})