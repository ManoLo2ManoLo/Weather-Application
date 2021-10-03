# Weather-Application

# LINKS SECTION
Link to GitHub Repository: https://github.com/ManoLo2ManoLo/Weather-Application.git <br />
Link to Application: https://manolo2manolo.github.io/Weather-Application/

# PURPOSE OF APPLICATION
The purpose of the weather application is to serve as a weather app. The user would enter a valid city name inside an input box, and click the search button. With the use of server-side apis, the weather forecast would be displayed to the right of the search side area. On the weather forecast side, the upper portion displayed the current day forecast (City name, today's date, icon of weather forecast, temperature, wind speed, humidity, and uv index). In the UV index, the color of the background would change on whether it is favorable(green), moderate(orange), and severe(red). If the user were to enter an invalid city name, an error message would be displayed where the current day forcast would be. On a valid city name, under the current day forecast, a 5 day forecast section will be seen. On each of the five day, the date, weather icon, temperature, wind speed, and humidity is displayed.

After the user searches for a city's weather forecast, the city name is stored into local storage, valid or not. Then links buttons are created from local storage, that if they are pressed, that weather forecast is displayed.

Incase the user would like the clear search history, there is a semi-hidden clear search history button on the left side of the navbar. It would clear local storage and reload page, making the search history button list to being cleared, as if the weather app would appear to be loaded for the first time.

# LICENSE
Copyright (c) 2021 ManoLo2ManoLo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# CREDIT
This code was typed and revised by Manuel Canas-Menendez (ManoLo2ManoLo).

# NECESSARY FILES
index.html (the structure of the webpage) <br />
-assets folder <br />
--css folder <br />
---style.css (the styling of the webpage) <br />
--js folder <br />
---script.js (the functionality of the webpage)

# THIRD-PARTY API
Link to Bootstrap (css): https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css <br />
Link to Bootstrap (javascript): https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js <br />
Link to Moment.js (javascript): https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js <br />
Link to J Query (javascript): https://code.jquery.com/jquery-3.5.0.min.js

# SERVER-SIDE API
Link to OpenWeather's Website: https://openweathermap.org/ <br />

Link to OpenWeather's API (to get longitude and latitude from the city name): <br />
https://api.openweathermap.org/data/2.5/weather?q={cityName}&appid={myApiKey}; <br />

Link to OpenWeather's API (from longitude and latitude): <br />
https://api.openweathermap.org/data/2.5/onecall?lat={latitude}&lon={longitude}&exclude=minutely,hourly,alerts&appid={myApiKey}

# SCREENSHOTS
In this image, this is a what the application looks like if the user loads it up for the first time
![WeatherWebPage](https://user-images.githubusercontent.com/88364269/135751633-4307d9a2-39ce-4f8f-9f77-bd5c7059545a.png)

In this image, this is what the application looks like if the user were to enter a valid city name. You can see that if the UV index that are under a favorable state are displayed in green. The name would also be stored inside local storage.
![WeatherForecastPage](https://user-images.githubusercontent.com/88364269/135751675-8a70a306-63ba-431c-955b-023cd4d88711.png)

In this image, you can see if the UV index that are in a moderate state are displayed in orange.
![WeatherUVModerate](https://user-images.githubusercontent.com/88364269/135751738-5d3f1349-1a1e-4c2f-b2c9-e73424d812e2.png)

In this image, you can see if the UV index that are in a severe state are displayed in red.
![WeatherUVSevere](https://user-images.githubusercontent.com/88364269/135751749-6334312f-afdd-4dd1-be0c-4dffe7d3d9a7.png)

In this image, you can see what would see an error message to be displayed in the area of the current day weather forecast.
![WeatherErrorPage](https://user-images.githubusercontent.com/88364269/135752153-6ab77a5e-dc83-4d56-9e7a-ddc324bdd9a9.png)

In this image, you can see what the search history list would look like if it had a few cities in the local storage.
![WeatherHistoryList](https://user-images.githubusercontent.com/88364269/135751793-5eeeec34-ba40-4cc4-bfe6-f35c666623a2.png)

In this image, you can see a semi-hidden clear search history button (before and after hover). This would clear what was stored inside the local storage. <br />
![WeatherClear](https://user-images.githubusercontent.com/88364269/135752159-e03d7675-6a7f-4750-be85-6d949c1b7169.png)
![WeatherClearHover](https://user-images.githubusercontent.com/88364269/135752163-2b881a58-27fa-4d38-8d94-786b7a293b4c.png)