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
const searchBtn = document.getElementById('searchBtn');

// Some Variables
let cityName = '';
let locationArray = [];
let weatherArray = [];
let currentDay;

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
    let c = weatherArray.current;
    let kelvinToFahrenheit = ((((c.temp - 273.15) * 9) / 5) + 32)
    let kel2Fah = kelvinToFahrenheit.toFixed(2);
    let uvIndex = c.uvi
    let iconUrl = 'http://openweathermap.org/img/w/' + c.weather[0].icon + ".png"

    dateEl.textContent = moment(c.dt, 'X').format('MM/DD/YYYY') + ' ';
    $('#iconEl').attr('src', iconUrl);
    console.log(c.weather)
    cityEl.textContent = locationArray.name;
    tempEl.textContent = 'Temp: ' + kel2Fah + '\u00B0F';
    windEl.textContent = 'Wind: ' + c.wind_speed + ' MPH';
    humidEl.textContent = 'Humidity: ' + c.humidity + ' %';
    uvEl.textContent = 'UV Index: ' + uvIndex;
    
    $('#uvEl').each(function() {
        if (uvIndex < 3) {
            $(this).addClass('low');
        } else if (uvIndex >= 3 && uvIndex < 6) {
            $(this).addClass('moderate');
        } else {
            $(this).addClass('severe');
        }
    });

    var titleEl = document.createElement('p');
    titleEl.innerHTML = '5-Day Forecast:';
    titleEl.classList = 'title fiveDay';
    fiveDayForecastEl.appendChild(titleEl);

    for (currentDay = 1; currentDay < 6; currentDay++) {
        let d = weatherArray.daily[currentDay]
        let kelvinToFahrenheit = ((((d.temp.day - 273.15) * 9) / 5) + 32)
        let kel2Fah = kelvinToFahrenheit.toFixed(2);
        let date = moment(d.dt, 'X')
        let dayIconUrl = 'http://openweathermap.org/img/w/' + d.weather[0].icon + ".png"

        var dayEl = document.createElement('div');
        dayEl.classList = 'col-2 weatherCard';

        var dayRowEl = document.createElement('div');
        dayRowEl.classList = 'row';

        var dayDateEl = document.createElement('p');
        dayDateEl.innerHTML = date.format('MM/DD/YYYY');
        dayDateEl.classList = 'miniTitle';

        var dayIconEl = document.createElement('img');
        dayIconEl.classList = 'icon';
        $(dayIconEl).attr('src', dayIconUrl);

        var dayTempEl = document.createElement('p');
        dayTempEl.innerHTML = 'Temp: ' + kel2Fah + '\u00B0F';

        var dayWindEl = document.createElement('p');
        dayWindEl.innerHTML = 'Wind: ' + d.wind_speed + ' MPH';

        var dayHumidEl = document.createElement('p');
        dayHumidEl.innerHTML = 'Humidity: ' + d.humidity + " %";

        dayRowEl.appendChild(dayDateEl);
        dayRowEl.appendChild(dayIconEl);
        dayRowEl.appendChild(dayTempEl);
        dayRowEl.appendChild(dayWindEl);
        dayRowEl.appendChild(dayHumidEl);
        dayEl.appendChild(dayRowEl);
        fiveDayForecastEl.appendChild(dayEl);
    }

}

// Function for when user searches for a city name
searchBtn.onclick = function() {
    cityName = searchEl.value;

    if (cityName) {
        weatherArea.style.display="block";
        fiveDayForecastEl.innerHTML = '';
        generateLocation();
    }
}