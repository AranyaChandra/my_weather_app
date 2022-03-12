import React, { useState } from 'react';
const api = {
  key: "b2040ea36b401f0824bf66d578008a2d",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? (weather.main.temp > 30?'app dwarm':'app warm') : (weather.main.temp<8? 'app dcold' : 'app')) : 'app invalidpage'}>
 
      <main>
      <div className='title'>
             Weathery
           </div>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          
            <div className='elements'>
           
           
            <div className='middle-element'>
           
            <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>

            <div className="temp">
              {Math.round(weather.main.temp)}°c
              </div>
            <div className='weatherbox'>
              <div className="weather"> {weather.weather[0].description}</div>
              <div className='humidity'>Humidity: {weather.main.humidity}</div>
              <div className='feel'>Feels like {Math.round(weather.main.feels_like)}°c</div>
            </div>
            </div>
            <div className="MinMax">
              <div className='MinTemp'>
                    Minimum Temperature: {Math.round(weather.main.temp_min)}°c 
              </div>
              |
              <div className='MaxTemp'>
                    Maximum Temperature: {Math.round(weather.main.temp_max)}°c
              </div>
            </div>
           </div> 
          
        </div>
        ) : <div className='invalidbox'>
           Enter a Valid City
      </div>}
      </main>
    </div>
  );
}

export default App;