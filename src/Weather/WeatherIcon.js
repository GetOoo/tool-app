import { useEffect, useState } from "react";
import classes from "./WeatherIcon.module.css";

const descriptionMapping = new Map();
descriptionMapping.set(50, "陽光充沛");
descriptionMapping.set(51, "間有陽光");
descriptionMapping.set(52, "短暫陽光");
descriptionMapping.set(53, "間有陽光幾陣驟雨");
descriptionMapping.set(54, "短暫陽光有驟雨");
descriptionMapping.set(60, "多雲");
descriptionMapping.set(61, "密雲");
descriptionMapping.set(62, "微雨");
descriptionMapping.set(63, "雨");
descriptionMapping.set(64, "大雨");
descriptionMapping.set(65, "雷暴");
descriptionMapping.set(70, "天色良好");
descriptionMapping.set(71, "天色良好");
descriptionMapping.set(72, "天色良好");
descriptionMapping.set(73, "天色良好");
descriptionMapping.set(74, "天色良好");
descriptionMapping.set(75, "天色良好");
descriptionMapping.set(76, "大致多雲");
descriptionMapping.set(77, "天色大致良好");
descriptionMapping.set(80, "大風");
descriptionMapping.set(81, "乾燥");
descriptionMapping.set(82, "潮濕");
descriptionMapping.set(83, "霧");
descriptionMapping.set(84, "薄霧");
descriptionMapping.set(85, "煙霞");
descriptionMapping.set(90, "熱");
descriptionMapping.set(91, "暖");
descriptionMapping.set(92, "涼");
descriptionMapping.set(93, "冷");

const WeatherIcon = () => {
  const [illustration, setIllustration] = useState();
  const [description, setDescription] = useState();
  const [fontSize, setFontSize] = useState("3vw");
  const [firstCall, setFirstCall] = useState(50);

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await fetch(
        "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=tc"
      );
      const resData = await response.json();
      const icon = resData.icon[0];
      const illustrationURL = `https://www.hko.gov.hk/images/HKOWxIconOutline/pic${icon}.png`;
      setIllustration(illustrationURL);
      const description = descriptionMapping.get(icon);
      setDescription(description);
      const desLength = description.length;
      const fontSize = desLength > 4 ? 12 / desLength : 3;
      setFontSize(fontSize + "vw");
      if (firstCall !== 300000) setFirstCall(300000);
    }, firstCall);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.weatherIcon}>
      <img src={illustration} alt="" />
      <div style={{ fontSize: fontSize }}>{description}</div>
    </div>
  );
};

export default WeatherIcon;
