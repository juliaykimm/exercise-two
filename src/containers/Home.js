import React from "react";

import Header from "../components/Header";

const weatherKey = "3d75d88668a19b7e333f156c4176436c";

function Home() {
  /* DISPLAYS:
    Weather Type (ex. Cloudy)
    Current Temperature
    High Temperature
    Low Temperature
    Cloudiness
    Humidity
    Wind Speed
    */
  return (
    <>
      <Header />
      <main className="Home">
        <h2>Weather in Seoul</h2>
        <div className="WeatherInfo">
          <p>Weather Type: Cloudy</p>
          <p>Current Temp: 65</p>
          <p>High Tempurature: 68</p>
          <p>Low Tempurature: 62</p>
          <p>Cloudiness: 100</p>
          <p>Humidity: 35%</p>
          <p>Wind Speed: 3km/hr</p>
        </div>
      </main>
    </>
  );
}

export default Home;
