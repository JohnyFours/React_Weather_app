
import { useState } from 'react';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import './App.css';
import CurrentWeather from './components/currentWeather/currentWeather';
import Forecast from './components/forecast/forecast';
import Search from './components/search/Search';

function App() {

  const [currenWeather, setCurrenWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currenWeaterFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currenWeaterFetch, forecastFetch])
      .then(async (resopnse) => {
        const weatherResponse = await resopnse[0].json();
        const forecastResponse = await resopnse[1].json();
        setCurrenWeather({city: searchData.label, ...weatherResponse});
        setForecast({city: searchData.label, ...forecastResponse});
      })
      .catch((err)=> console.log(err));
  }
  console.log(forecast);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currenWeather && <CurrentWeather data ={currenWeather}/>}
      {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
