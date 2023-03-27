import WeatherIcon from "./WeatherIcon";
import WeatherTemperature from "./WeatherTemperature";
import WeatherWarn from "./WeatherWarn";
import classes from "./Weather.module.css";

const Weather = () => {
  return (
    <div className={classes.weather}>
      <div className={classes.left}>
        <div className={classes.title}>大埔</div>
        <WeatherIcon />
      </div>
      <div className={classes.right}>
        <WeatherWarn />
        <WeatherTemperature />
      </div>
    </div>
  );
};
export default Weather;
