// Elements that has text contents in it
const searchEl = document.getElementById('searchEl');
const dateEl = document.getElementById('dateEl');
const cityEl = document.getElementById('cityEl');
const tempEl = document.getElementById('tempEl');
const windEl = document.getElementById('windEl');
const humidEl = document.getElementById('humidEl');
const uvEl = document.getElementById('uvEl');
const fiveDayForecastEl = document.getElementById('fiveDayForecastEl');
const weatherArea = document.getElementById('weatherArea');

// Elements that are buttons
const clearBtn = document.getElementById('clearBtn');
const searchBtn = document.getElementById('searchBtn');
const btnList = document.getElementById('btnList');


// Some Variables
let cityName = '';
let locationArray = [];
let weatherArray = [];
let currentDay;
let cityBtn;
let iconUrl = '';

// Server API to gather Location for the Weather
function generateLocation() {
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=06b8acf76066beddfccf87017b0bb7a2';

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then (function(data) {
                localStorage.setItem(data.name, '');
                $('#btnList').children().remove();
                generateButton();
                locationArray = data;
                generateWeather();
            })
        } else {
            errorMessage();
        }
    })
}

// Server API to gather weather information 
function generateWeather() {
    let lon = locationArray.coord.lon;
    let lat = locationArray.coord.lat
    let apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon +'&exclude=minutely,hourly,alerts&appid=06b8acf76066beddfccf87017b0bb7a2';

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then (function(data) {
                weatherArray = data;
                displayWeather();
            })
        }
    })

}

// Function to display the weather forecast
function displayWeather() {
    // Start of Current Day Weather Forecast
    let c = weatherArray.current;
    let kelvinToFahrenheit = ((((c.temp - 273.15) * 9) / 5) + 32)
    let kel2Fah = kelvinToFahrenheit.toFixed(2);
    let uvIndex = c.uvi
    iconUrl = 'http://openweathermap.org/img/w/' + c.weather[0].icon + ".png"

    // Replaces Text in the HTML File
    dateEl.textContent = moment(c.dt, 'X').format('MM/DD/YYYY') + ' ';
    $('#iconEl').attr('src', iconUrl);
    $('#iconEl').attr('alt', c.weather[0].description);
    cityEl.textContent = locationArray.name;
    tempEl.textContent = 'Temp: ' + kel2Fah + '\u00B0F';
    windEl.textContent = 'Wind: ' + c.wind_speed + ' MPH';
    humidEl.textContent = 'Humidity: ' + c.humidity + ' %';
    uvEl.textContent = 'UV Index: ' + uvIndex;
    
    // Give UV Index a Class
    $('#uvEl').each(function() {
        if (uvIndex > 6) {
            $(this).addClass('severe');
            $(this).removeClass('moderate');
            $(this).removeClass('low');
        } else if (uvIndex <= 6 && uvIndex > 3) {
            $(this).addClass('moderate');
            $(this).removeClass('severe');
            $(this).removeClass('low');
        } else {
            $(this).addClass('low');
            $(this).removeClass('moderate');
            $(this).removeClass('severe');
        }
    });
    // End of Current Day Weather Forecast

    // Start Of 5 Day Weather Forecast
    let titleEl = document.createElement('h3');
    titleEl.innerHTML = '5-Day Forecast:';
    titleEl.classList = 'center my-2';
    fiveDayForecastEl.appendChild(titleEl);

    // For Loop to Create Each Day's of the Weather Cards
    for (currentDay = 1; currentDay < 6; currentDay++) {
        let d = weatherArray.daily[currentDay]
        let kelvinToFahrenheit = ((((d.temp.day - 273.15) * 9) / 5) + 32)
        let kel2Fah = kelvinToFahrenheit.toFixed(2);
        let date = moment(d.dt, 'X')
        let dayIconUrl = 'http://openweathermap.org/img/w/' + d.weather[0].icon + ".png"

        let dayEl = document.createElement('div');
        dayEl.classList = 'card col-sm-6 col-md-6 col-lg-4';

        let dayRowEl = document.createElement('div');
        dayRowEl.classList = 'card-body';

        let dayDateEl = document.createElement('p');
        dayDateEl.innerHTML = date.format('MM/DD/YYYY');
        dayDateEl.classList = 'miniTitle';

        let dayIconEl = document.createElement('img');
        dayIconEl.classList = 'icon';
        $(dayIconEl).attr('src', dayIconUrl);
        $(dayIconEl).attr('alt', d.weather[0].description);

        let dayTempEl = document.createElement('p');
        dayTempEl.innerHTML = 'Temp: ' + kel2Fah + '\u00B0F';

        let dayWindEl = document.createElement('p');
        dayWindEl.innerHTML = 'Wind: ' + d.wind_speed + ' MPH';

        let dayHumidEl = document.createElement('p');
        dayHumidEl.innerHTML = 'Humidity: ' + d.humidity + " %";

        // Declares which elements have childrens
        dayRowEl.appendChild(dayDateEl);
        dayRowEl.appendChild(dayIconEl);
        dayRowEl.appendChild(dayTempEl);
        dayRowEl.appendChild(dayWindEl);
        dayRowEl.appendChild(dayHumidEl);
        dayEl.appendChild(dayRowEl);
        fiveDayForecastEl.appendChild(dayEl);
        // End of 5 Day Weather Forecast
    }
}

// Function to generate the search history button list
function generateButton() {
    for(let j = 0; j < localStorage.length; j++) {
        const key = localStorage.key(j)

        let listItem = document.createElement('li');
        
        cityBtn = document.createElement('button');
        cityBtn.classList = 'dropdown-item'
        cityBtn.innerText = `${key}`;

        listItem.appendChild(cityBtn)
        btnList.appendChild(listItem);
    }

    $("button").each(function() {
        $(this).on("click", function(event) {
            cityName = $(this)[0].innerHTML;
            if (cityName && cityName != 'Search' && cityName != 'Clear Search History') {
                event.preventDefault();
                weatherArea.style.display="block";
                fiveDayForecastEl.innerHTML = '';
                generateLocation();
            }
        });
    });
}

// Function for when user searches for a city name
searchBtn.onclick = function() {
    cityName = searchEl.value;

    if (cityName) {
        searchEl.value = '';
        weatherArea.style.display="block";
        fiveDayForecastEl.innerHTML = '';
        generateLocation();
    }
}

// Function if the user enters an invalid city name
function errorMessage() {
    $('#iconEl').attr('src', null);
    $('#iconEl').attr('alt', null);
    dateEl.textContent = ''
    cityEl.textContent = 'Error in finding your city!';
    tempEl.textContent = 'Please enter a valid city name, or check your spelling.'
    windEl.textContent = 'Sorry for the inconvience.'
    humidEl.textContent = 'Have a nice day!'
    uvEl.textContent = ''
}

// Function to clear search history
clearBtn.onclick = function() {
    localStorage.clear();
    location.reload();
}

// Function to create search history button when webpage is loaded
$(document).ready(function () {
    generateButton();
    cityName = localStorage.key(0);
    generateLocation();
})