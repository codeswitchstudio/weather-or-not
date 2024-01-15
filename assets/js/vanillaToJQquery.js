
//   - When a user views the current weather conditions for that city they are presented with:
//     - The city name
//     - The date
//     - An icon representation of weather conditions
//     - The temperature
//     - The humidity
//     - The wind speed
//   - When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
//     - The date
//     - An icon representation of weather conditions
//     - The temperature
//     - The humidity
//   - When a user click on a city in the search history they are again presented with current and future conditions for that city


$( function() {
  // const searchButton = $('#search-button'); 
  const weatherContainer = $('#weather');
  const forecastContainer = $('#five-day');
  const historyContainer = $('#history');
  const APIKey = 'ae33ce6155933dc0cae19ca26232b426';


  function getApi() {
    const searchValue = $('#location').val();
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${APIKey}&units=metric`;

    // fetch(requestUrl)
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (data) {
    //     $('#location').val('')

    fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      $('#location').val('');

        //temperature
        // const temp = document.createElement('div');
        // temp.textContent = "Temp: " + data.main.temp + " C";
        // temp.classList = "current-list-group";

        const temp = $('<div>').text(`Temp: ${data.main.temp} C`).addClass('current-list-group');


        //location
        // const cityEl = document.createElement('h3');
        // cityEl.textContent = data.name;
        const cityEl = $('<h3>').text(data.name);


        //humidity element
        // const humidity = document.createElement('div');
        // humidity.textContent = "Humidity: " + data.main.humidity + "% ";
        // humidity.classList = "current-list-group";

        const humidity = $('<div>').text(`Humidity: ${data.main.humidity} %`).addClass('current-list-group');

        //wind speed
        // const windSpeed = document.createElement('div');
        // windSpeed.textContent = "Wind Speed: " + data.wind.speed + "mph ";
        // windSpeed.classList = "current-list-group";

        const windSpeed = $('<div>').text(`Wind Speed: ${data.wind.speed} mph`).addClass('current-list-group');

        //icons
        // const weatherIcon = document.createElement("img")
        // weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        // cityEl.appendChild(weatherIcon);

        const weatherIcon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`).cityEl.append(weatherIcon);


        // var currentDate = document.createElement("div")
        // currentDate.textContent = dayjs().format('DD MMMM YYYY') ; 
        // cityEl.appendChild(currentDate);

        const currentDate = $('<div>').text(` (${dayjs().format('DD/MM/YYYY')})`);  //geez soo many closing parentheses things! 
          cityEl.append(currentDate);

        //contain all the variables

        // weatherContainer.innerHTML = '';
        // weatherContainer.append(cityEl, temp, humidity, windSpeed);

        weatherContainer.html('');
        weatherContainer.append(cityEl, temp, humidity, windSpeed);

          const lon = data.coord.lon;
          const lat = data.coord.lat;

        //recent searches in aside section
        // const searchNameEl = document.createElement('h3')
        const searchNameEl = $('<h3>').text(data.name);
        window.localStorage.setItem('h2', data.name);
        window.localStorage.getItem('h2');
        historyContainer.append(searchNameEl);
      });
  }

// five day forecast
  function getFiveDay() {

    // const searchValue = document.getElementById('location').value;
    const searchValue = $('#location').val();
    const fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=metric&appid=${APIKey}`;

    // fetch(fiveDayUrl)
    //   .then(function (response) {
    //     return response.json();
    //   })

    //   .then(function (data) {
    //     console.log(data);
    //     forecastContainer.innerHTML = '';

      fetch(fiveDayUrl)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          forecastContainer.html('');
        
        for (let i = 0; i < data.list.length; i += 8) {
        
          // var div = document.createElement("div");
          // div.style.display = 'inline-block';
          // div.setAttribute('class', 'col-md-2  col-sm-4')
          const div = $('<div>').css('display', 'inline-block').addClass('col-md-2 col-sm-4');

          //date
          // const fivecurrentDate = document.createElement("div")
          // fivecurrentDate.textContent = dayjs(data.list[i].dt_txt).format("DD MMM YYYY");
          const fivecurrentDate = $('<div>').text(dayjs(data.list[i].dt_txt).format('MMM D, YYYY'));

          //temp
          // const temp5 = document.createElement('div');
          // temp5.textContent = "Temp: " + data.list[i].main.temp + " C";
          // temp5.classList = "five-day-list-group";
          const temp5 = $('<div>').text(`Temp: ${data.list[i].main.temp} C`).addClass('five-day-list-group');


          //humidity
          // const fivehumidity = document.createElement('div');
          // fivehumidity.textContent = "Humidity: " + data.list[i].main.humidity + "% ";
          // fivehumidity.classList = "five-day-list-group";
          const fivehumidity = $('<div>').text(`Humidity: ${data.list[i].main.humidity}%`).addClass('five-day-list-group');

          //openweather icons
          const pic = data.list[i].weather[0].icon
          // var fiveweatherIcon = document.createElement("img")
          // fiveweatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${pic}@2x.png`);
          // fivehumidity.appendChild(fiveweatherIcon);
          const fiveweatherIcon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${pic}@2x.png`);
          fivehumidity.append(fiveweatherIcon);      

          temp5.appendChild(fivehumidity);
          fivecurrentDate.appendChild(temp5);
          div.appendChild(fivecurrentDate);
          forecastContainer.appendChild(div);

        }
      });
// searchButton.addEventListener('click', getApi);
// searchButton.addEventListener('click', getFiveDay);
// window.addEventListener("load", function () {
// window.localStorage.getItem("history")
// })

  // const searchButton = $('#search-button');
  // searchButton.on('click', function () {
  //   getApi();
  //   getFiveDay();
  // });
  $('#search-button').on('click', function () {
    getApi();
    getFiveDay();
  });

  $(window).on('load', function () {
    window.localStorage.getItem('history');
  });

  }

});