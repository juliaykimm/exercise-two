import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import { WeatherImage } from "react-router-dom";
import Header from "../components/Header";
import WeatherImage from "../components/WeatherImage";

const weatherKey = `3d75d88668a19b7e333f156c4176436c`;

function Home() {
  const history = useHistory();
  // const [backgroundColor, setBackgroundColor] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Chicago");

  useEffect(() => {
    // setCity("Seoul");
    // setBackgroundColor("e5e5e5");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherKey}`
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
  }, [city]);

  useEffect(() => {
    const searchParams = history.location.search;
    const urlParams = new URLSearchParams(searchParams);
    const city = urlParams.get("city");
    if (city) {
      setCity(city);
    }
    console.log("urlParams", urlParams);
  }, [history]);

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
      currentTemp = `${Math.round(weatherData.main.temp)}˚`;
      highTemp = `${Math.round(weatherData.main.temp_max)}˚`;
      humidity = `${weatherData.main.humidity}%`;
      lowTemp = `${Math.round(weatherData.main.temp_min)}˚`;
      weatherType = `${weatherData.weather[0].description}`;
      windSpeed = `${weatherData.wind.speed} mph`;
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
      <main className="Home">
        <h2>
          Weather in&nbsp;<span>{city}</span>
        </h2>
        <div className="WeatherInfo">
          <div
            className="WeatherInfo_Basic"
            style={{ backgroundColor: `rgba(1,50,70,${cloudiness})` }}
          >
            <div className="WeatherInfo_Image">
              <WeatherImage weatherType={weatherType} />
            </div>
            <p className="WeatherInfo_Type">{weatherType}</p>
            <h3 className="Label">Current Temperature:</h3>
            <p className="WeatherInfo_Temperature">{currentTemp}</p>
          </div>
          <div className="WeatherInfo_Extra">
            <div className="WeatherInfo_Extra_Column">
              <h3 className="Label">High Temperature</h3>
              <p className="WeatherInfo_Temperature_Small">{highTemp} </p>
              <h3 className="Label">Low Temperature</h3>
              <p className="WeatherInfo_Temperature_Small">{lowTemp}</p>
            </div>
            <div className="WeatherInfo_Extra_Column">
              <h3 className="Label">Cloudiness:</h3>
              <p className="WeatherInfo_Temperature_Small">{cloudiness}</p>
              <h3 className="Label">Humidity</h3>
              <p className="WeatherInfo_Temperature_Small">{humidity}</p>
              <h3 className="Label">Wind Speed</h3>
              <p className="WeatherInfo_Temperature_Small">{windSpeed}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
