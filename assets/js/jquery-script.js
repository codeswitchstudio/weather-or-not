$(window).on('load', function () {
  window.localStorage.getItem('history');
  getApi(); 
});

  const weatherContainer = $('#weather');
  const forecastContainer = $('#five-day');
  const historyContainer = $('#history');
  const searchButton = $('#search-button');
  const APIKey = 'ae33ce6155933dc0cae19ca26232b426';


  function getApi() {
    const searchValue = $('#search-city').val();

    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${APIKey}&units=metric`;

    fetch(requestUrl)
      .then(response => response.json())
      .then(data => {

        $('#search-city').val('');

        //temp
        const temp = $('<div>').text(`Temp: ${data.main.temp} C`).addClass('current-list-group');

        //search city
        const cityEl = $('<h3>').text(data.name);

        //humidity
        const humidity = $('<div>').text(`Humidity: ${data.main.humidity}%`).addClass('current-list-group');

        //wind speed
        const windSpeed = $('<div>').text(`Wind Speed: ${data.wind.speed}mph`).addClass('current-list-group');

        //weather icon next to city
        const weatherIcon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        cityEl.append(weatherIcon);

        const currentDate = $('<div>').text(` (${dayjs().format('DD/MM/YYYY')})`);
        cityEl.append(currentDate);

        //put all var into container
        weatherContainer.html('');
        weatherContainer.append(cityEl, temp, humidity, windSpeed);

        const lon = data.coord.lon;
        const lat = data.coord.lat;

        //recent searches in aside section
        const searchNameEl = $('<h3>').text(data.name);
        window.localStorage.setItem('h2', data.name);
        window.localStorage.getItem('h2');
        historyContainer.append(searchNameEl);
      });
  }

  // five day forecast
  function getFiveDay() {
    const searchValue = $('#search-city').val();
    const fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=metric&appid=${APIKey}`;

    fetch(fiveDayUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        forecastContainer.html('');

        for (let i = 0; i < data.list.length; i += 8) {
          const div = $('<div>').css('display', 'inline-block').addClass('col-md-2 col-sm-4');

          //date
          const fivecurrentDate = $('<div>').text(dayjs(data.list[i].dt_txt).format('MMM D, YYYY'));

          const temp5 = $('<div>').text(`Temp: ${data.list[i].main.temp} C`).addClass('five-day-list-group');

          //humidity
          const fivehumidity = $('<div>').text(`Humidity: ${data.list[i].main.humidity}%`).addClass('five-day-list-group');

          //pic icon for weather
          const pic = data.list[i].weather[0].icon;
          const fiveweatherIcon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${pic}@2x.png`);
          fivehumidity.append(fiveweatherIcon);

          temp5.append(fivehumidity);
          fivecurrentDate.append(temp5);
          div.append(fivecurrentDate);
          forecastContainer.append(div);
        }
      });
  }

  searchButton.on('click', function () {
    getApi();
    getFiveDay();
  });



