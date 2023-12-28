import React, { useState } from 'react';
import '../WeatherApp/WeatherApp.css';

import searchIcon from '../Assets/search.png';
import clear from '../Assets/clear.png';
import cloud from '../Assets/cloud.png';
import drizzle from '../Assets/drizzle.png';
import rain from '../Assets/rain.png';
import snow from '../Assets/snow.png';
import wind from '../Assets/wind.png';
import humidity from '../Assets/humidity.png';

const WeatherApp = () => {

  const [weatherData, setWeatherData] = useState(null);
  let api_key = "f638da06b3c4247e4b772ce25ed3983a";

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    setWeatherData(data);
  }

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'Clear':
        return clear;
      case 'Clouds':
        return cloud;
      case 'Drizzle':
        return drizzle;
      case 'Rain':
        return rain;
      case 'Snow':
        return snow;
      default:
        return cloud;
    }
  }

  return (
    <div className='container'>
      <h1>React Weather App</h1>
      <div className='top-bar'>
        <input type='text' className='cityInput' placeholder='search' />
        <div className='search-icon' onClick={search}>
          <img src={searchIcon} alt="" />
        </div>
      </div>
      {weatherData && (
        <>
          <div className='weather-image'>
            <img src={getWeatherIcon(weatherData.weather[0].main)} alt="" />
          </div>
          <div className="weather-temp">{Math.round(weatherData.main.temp - 273.15)}°C</div>
          <div className='weather-location'>{weatherData.name}</div>
          <div className="data-container">
            <div className='element'>
              <img src={humidity} alt="" className='icon' />
              <div className='data'>
                <div className='humidity-percent'>{weatherData.main.humidity}%</div>
                <div className='text'>Humidity</div>
              </div>
            </div>
            <div className='element'>
              <img src={wind} alt="" className='icon' />
              <div className='data'>
                <div className='humidity-percent'>{weatherData.wind.speed} km/h</div>
                <div className='text'>Wind Speed</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default WeatherApp;
