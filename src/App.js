import { useEffect, useMemo, useState } from "react";
import { api } from "./config/api";
import { useGeolocation } from "./hooks/use-geolocation";
import { interpolateColor } from "./utils";

const LOWEST_COLOR = '#000000'
const LOW_COLOR = '#00ffff';
const MEDIUM_COLOR = '#fff700';
const HIGH_COLOR = '#ff8c00';
const HIGHEST_COLOR = '#ffffff';

export const App = () => {
  const [position, errorPosition] = useGeolocation();
  
  const [temperature, setTemperature] = useState(0);
  const onTemperatureChange = (e) => {
    setTemperature(parseInt(e.target.value));
  }

  const [weatherIcon, setWeatherIcon] = useState(null);
  useEffect(() => {
    if(!position) return;

    api(`/current`, {
      params: {
        query: `${position.latitude},${position.longitude}`,
      }
    })
      .then(({ data }) => {
        setWeatherIcon(data.current.weather_icons[0]);
        setTemperature(data.current.temperature)
      })
  }, [position]);

  const backgroundColor = useMemo(() => {
    let color;
    if(temperature <= -10) {
      color = interpolateColor(-10, -100, temperature, LOWEST_COLOR, LOW_COLOR);
    } else if(temperature <= 10) {
      color = interpolateColor(10, -10, temperature, LOW_COLOR, MEDIUM_COLOR);
    } else if(temperature < 30) {
      color = interpolateColor(30, 10, temperature, MEDIUM_COLOR, HIGH_COLOR);
    } else {
      color = interpolateColor(100, 30, temperature, HIGH_COLOR, HIGHEST_COLOR);
    }

    return color;
  }, [temperature]);

  return (
    <div className="weather-wrapper" style={{ backgroundColor }}>
      {weatherIcon && (
        <>
          <img src={weatherIcon} alt="weather" />
          <input type="range" min="-100" max="100" value={temperature} onChange={onTemperatureChange} />
          {temperature}
        </>
      )}
      {errorPosition && (
        <p>{errorPosition.description}</p>
      )}
    </div>
  );
}

export default App;
