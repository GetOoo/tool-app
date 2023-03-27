import { useEffect, useState } from "react";
import classes from "./WeatherTemperature.module.css";

const WeatherTemperature = () => {
  const [curTemp, setCurTemp] = useState(25);
  const [minTemp, setMinTemp] = useState(25);
  const [maxTemp, setMaxTemp] = useState(25);
  const [firstCall, setFirstCall] = useState(50);

  useEffect(() => {
    const interval = setInterval(async () => {
      const responseCur = await fetch(
        "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=tc"
      );
      const resCurData = await responseCur.json();
      const tempsData = resCurData.temperature.data;
      const temp = tempsData.find(
        (tempData) => tempData.place === "大埔"
      ).value;
      setCurTemp(temp);

      const responseMinMax = await fetch(
        "https://api.weatherapi.com/v1/forecast.json?key=ecf94df0d59647c0a3d81144231901&q=tai-po"
      );
      const resMinMaxData = await responseMinMax.json();
      const min = resMinMaxData.forecast.forecastday[0].day.mintemp_c;
      const max = resMinMaxData.forecast.forecastday[0].day.maxtemp_c;
      setMinTemp(Math.floor(min));
      setMaxTemp(Math.ceil(max));
      if (firstCall !== 300000) setFirstCall(300000);
    }, firstCall);
    return () => clearInterval(interval);
  }, [firstCall]);

  return (
    <div className={classes.weatherTemperature}>
      <div className={classes.curTemp}>
        {curTemp}
        <span style={{ fontSize: "12vh" }}>℃</span>
      </div>
      <div className={classes.minMaxTemp}>
        {minTemp}
        <span style={{ fontSize: "5vh" }}>℃</span>~{maxTemp}
        <span style={{ fontSize: "5vh" }}>℃</span>
      </div>
    </div>
  );
};

export default WeatherTemperature;
