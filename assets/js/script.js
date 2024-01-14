const APIKey = 'ae33ce6155933dc0cae19ca26232b426';
const weatherContainer = document.getElementById('weather');
const forecastContainer = document.getElementById('five-day');
const historyContainer = document.getElementById('history');
const searchButton = document.getElementById('search-button');


// const currDate = dayjs().format('dddd, DD MMMM YYYY');

function getApi() {
    const searchValue = document.getElementById('location').value;

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

        const lon = data.coord.lon;
        const lat = data.coord.lat;

        // Recent searches in aside section
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
window.addEventListener("load", function () {
window.localStorage.getItem("history")
})

//previous buttons
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('history-button')) {
        // Retrieve the stored information from local storage
        const storedData = window.localStorage.getItem(event.target.textContent);
        
        if (storedData) {
            const { name, lon, lat } = JSON.parse(storedData);

            // Use the retrieved information to make a new API call
            const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;

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