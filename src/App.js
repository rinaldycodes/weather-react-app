import React, { useState } from "react";

const weatherApi = {
  key: "d7d9365393b843235e601be8967c68d1",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${weatherApi.base}weather?q=${query}&units=metric&APPID=${weatherApi.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery(query);
        });
    }
  };

  const dateBuilder = (d) => {
    // let months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];
    // let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  let city = query;

  return (
    <div className="app" style={{ backgroundImage: 'url("https://source.unsplash.com/800x450/?' + city + '")' }}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..." onChange={(e) => setQuery(e.target.value)} value={query} onKeyPress={search} />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}℃</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div className="welcome">
            <h2>Welcome!</h2>
            <h3>To</h3>
            <h1>Weather React App</h1>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
