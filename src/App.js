import axios from "axios";
import { useState } from "react";

function App() {
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  const unitAndKey = "&units=metric&appid=06c13f2c71d0f89c96f1e4719921ebd4";
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const submitHandle = (e) => {
    e.preventDefault();
    axios.get(baseUrl + city + unitAndKey)
      .then((res) => {
      setWeather(res.data.weather.map((weather) => weather.description));
      setTemp(res.data.main.temp);
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
      <div className="temp">{temp} °C</div>
      <div className="weather">{weather}</div>
    </div>
  );
}

export default App;
