// Elements that has text contents in it
const searchEl = document.getElementById('searchEl');
const cityEl = document.getElementById('cityEl');
const tempEl = document.getElementById('tempEl');
const windEl = document.getElementById('windEl');
const humidEl = document.getElementById('humidEl');
const uvEl = document.getElementById('uvEl');

// Elements that are buttons
const searchBtn = document.getElementById('searchBtn');

// Some Variables
let cityName = '';
let locationArray = [];
let weatherArray = [];

// Server API to gather Location for the Weather
function generateLocation() {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=06b8acf76066beddfccf87017b0bb7a2';

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then (function(data) {
                console.log(data);
                locationArray = data;
                generateWeather();
            })
        }
    })
}

// Server API to gather weather information 
function generateWeather() {
    var lon = locationArray.coord.lon;
    var lat = locationArray.coord.lat
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon +'&exclude=minutely,hourly,alerts&appid=06b8acf76066beddfccf87017b0bb7a2';

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then (function(data) {
                console.log(data);
                weatherArray = data;
                displayWeather();
            })
        }
    })

}

// 
function displayWeather() {
    let kelvinToFahrenheit = ((((weatherArray.current.temp - 273.15) * 9) / 5) + 32)
    let kel2Fah = kelvinToFahrenheit.toFixed(2);
    let uvIndex = weatherArray.current.uvi

    cityEl.textContent = locationArray.name;
    tempEl.textContent = 'Temp: ' + kel2Fah + '\u00B0F';
    windEl.textContent = 'Wind: ' + weatherArray.current.wind_speed + ' MPH';
    humidEl.textContent = 'Humidity: ' + weatherArray.current.humidity + ' %';
    uvEl.textContent = 'UV Index: ' + uvIndex;
    
    $('#uvEl').each(function() {
        if (uvIndex < 3) {
            $(this).addClass('low');
        } else if (uvIndex >= 3 && uvIndex < 6) {
            $(this).addClass('moderate');
        } else {
            $(this).addClass('severe');
        }
    })

}

function timeSetting() {
    $('#dateEl').text(moment().format('MM/DD/YYYY'))
}

// Function for when user searches for a city name
searchBtn.onclick = function() {
    cityName = searchEl.value;

    if (cityName) {
        generateLocation();
        timeSetting();
    }
}