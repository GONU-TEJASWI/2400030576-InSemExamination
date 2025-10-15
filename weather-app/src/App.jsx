import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handleSubmit = () => {
    if (city === "") return;

    // Mock API response (simple)
    const mockData = {
      name: city,
      sys: { country: "IN" },
      main: { temp: 30, humidity: 60 },
      weather: [{ main: "Clear" }]
    };

    setWeather(mockData);
  };

  return (
    <div className="container">
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSubmit}>Get Weather</button>

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Condition: {weather.weather[0].main}</p>
        </div>
      )}
    </div>
  );
}

export default App;