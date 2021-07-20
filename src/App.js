import axios from "axios";
import { useState } from "react";


function App() {
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  const unitAndKey = "&units=metric&appid=06c13f2c71d0f89c96f1e4719921ebd4";
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("-");
  const [country, setCountry] = useState("");
  const [tempMin, setTempMin] = useState("-");
  const [tempMax, setTempMax] = useState("-");

  const submitHandle = (e) => {
    e.preventDefault();
    axios
      .get(baseUrl + city + unitAndKey)
      .then((res) => {
        setWeather(res.data.weather.map((weather) => weather.description));
        setTemp(res.data.main.temp);
        setCountry(res.data.sys.country);
        setCity(res.data.name);
        setTempMin(res.data.main.temp_min);
        setTempMax(res.data.main.temp_max);
      })
      .catch((err) => {
        setCity("Not Found");
        setTemp("-");
        setWeather("-");
        setTempMax("-");
        setTempMin("-");
        setCountry(" ");
        setTimeout(function(){ window.location="/"; },500);
      });
  };

  return (
    <div className="App">
      <form onSubmit={submitHandle}>
        <input
          className="input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="enter city"
          type="text"
        />
      </form>
      <div className="location">
        {city} {country}
      </div>
      <div className="temp">{temp}°C</div>
      <div className="weather">{weather}</div>
      <div className="min-max">
        {tempMin}°C/{tempMax}°C{" "}
      </div>
    </div>
  );
}

export default App;
