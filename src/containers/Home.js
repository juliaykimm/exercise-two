import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

import Header from "../components/Header";

const weatherKey = `3d75d88668a19b7e333f156c4176436c`;

function Home() {
  // const [backgroundColor, setBackgroundColor] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Seoul");

  useEffect(() => {
    // setCity("Seoul");
    // setBackgroundColor("e5e5e5");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`
      ) // url or request
      .then(function (response) {
        // handle success
        const weather = response.data;
        setWeatherData(weather);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  const {
    cloudiness,
    currentTemp,
    highTemp,
    humidity,
    lowTemp,
    weatherType,
    windSpeed,
  } = useMemo(() => {
    let cloudiness = "";
    let currentTemp = "";
    let highTemp = "";
    let humidity = "";
    let lowTemp = "";
    let weatherType = "";
    let windSpeed = "";

    if (weatherData) {
      cloudiness = `${weatherData.clouds.all}%`;
      currentTemp = `${weatherData.main.temp}`;
      highTemp = `${weatherData.main.temp_max}`;
      humidity = `${weatherData.main.humidity}%`;
      lowTemp = `${weatherData.main.temp_min}`;
      weatherType = `${weatherData.weather[0].description}`;
      windSpeed = `${weatherData.wind.speed} km/hr`;
    }

    return {
      cloudiness,
      currentTemp,
      highTemp,
      humidity,
      lowTemp,
      weatherType,
      windSpeed,
    };
  }, [weatherData]);

  console.log("weatherData", weatherData);

  return (
    <>
      <Header />
      <main className="Home" /*style={{ backgroundColor }}*/>
        <h2>Weather in {city}</h2>
        <div className="WeatherInfo">
          <p>Weather Type: {weatherType}</p>
          <p>Current Temp: {currentTemp}</p>
          <p>High Tempurature: {highTemp} </p>
          <p>Low Tempurature: {lowTemp}</p>
          <p>Cloudiness: {cloudiness}</p>
          <p>Humidity: {humidity}</p>
          <p>Wind Speed: {windSpeed}</p>
        </div>
      </main>
    </>
  );
}

export default Home;
