
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


const APIKey = 'ae33ce6155933dc0cae19ca26232b426';

// - Create a weather dashboard with form inputs.
//   - When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history


const weatherContainer = document.querySelector('#weather');
const forecastContainer = document.querySelector('#five-day');
const historyContainer = document.querySelector('#history');
const searchButton = document.querySelector('#search-button');

let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];


// const currDate = dayjs().format('dddd, DD MMMM YYYY');

function getApi() {
    const searchValue = document.querySelector('#location').value;

    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${APIKey}&units=metric`;

    fetch(requestUrl)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data);
        $('#location').val('')

            //temperature
            var temp = document.createElement('div');
            temp.innerText = "Temp: " + data.main.temp + " C";
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

            //put all var into current weather box
            weatherContainer.innerHTML = '';
            weatherContainer.append(cityEl, temp, humidity, windSpeed);

            const lon = data.coord.lon;
            const lat = data.coord.lat;

            // search button
            var searchButtonEl = document.createElement('button');
            searchButtonEl.textContent = data.name;
            searchButtonEl.classList.add('history-button'); // Add the class 'history-button'
            searchButtonEl.addEventListener('click', function () {

            // Simulate a click on the stored button to fetch data again
            searchButtonEl.click();
            
            });


            window.localStorage.setItem("h3", JSON.stringify({ name: data.name, lon, lat }));
            window.localStorage.getItem("h3");

            historyContainer.append(searchButtonEl);

            // Add the search data to the searchHistory array
            // const searchData = { name: data.name, lon: data.coord.lon, lat: data.coord.lat };
            // searchHistory.push(searchData);



            // Check if the city is already in the search history
            // const existingSearch = searchHistory.find(entry => entry.name === data.name);
            

            // If the city is not in the history, add  the search data to the searchHistory array
                const searchData = { name: data.name, lon: data.coord.lon, lat: data.coord.lat };
                searchHistory.push(searchData);

                // Limit the array to the most recent 5 searches
                if (searchHistory.length > 5) {
                    searchHistory.shift(); // Remove the oldest entry
                }

                localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
                // Update the history buttons
                updateHistoryButtons();
            } 
            );
    }
    
function updateHistoryButtons() {
    historyContainer.innerHTML = '';
    searchHistory.forEach(searchData => {
        var searchButtonEl = document.createElement('button');
        searchButtonEl.textContent = searchData.name;
        searchButtonEl.classList.add('history-button');
        searchButtonEl.addEventListener('click', function () {
    // Simulate a click on the stored button to fetch data again
        searchButtonEl.click();



        });
    historyContainer.appendChild(searchButtonEl);
    });
}
        

// five day forecast
function getFiveDay() {

    var searchValue = document.getElementById('location').value;
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
window.addEventListener('load', function () {
    // Load search history on page load
    updateHistoryButtons();
});

// Event listener for history buttons
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('history-button')) {
        const searchText = event.target.textContent;
        const searchData = searchHistory.find(data => data.name === searchText);

        if (searchData) {
            // Use the retrieved information to make a new API call
            const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${searchData.lat}&lon=${searchData.lon}&appid=${APIKey}&units=metric`;

            fetch(requestUrl)
                .then(response => response.json())
                .then(data => {
                    // Process the data as needed
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        }
    }
});



// .then(function (response) {
//     return response.json();
//     })
//     .then(function (data) {
//     console.log(data);
//     $('#location').val('')