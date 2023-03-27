import { useEffect, useState } from "react";
import classes from "./WeatherWarn.module.css";

const warnMapping = new Map();
warnMapping.set(
  "WFIREY",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/firey.gif"
);
warnMapping.set(
  "WFIRER",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/firer.gif"
);
warnMapping.set(
  "WFROST",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/frost.gif"
);
warnMapping.set(
  "WHOT",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/vhot.gif"
);
warnMapping.set(
  "WCOLD",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/cold.gif"
);
warnMapping.set(
  "WMSGNL",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/sms.gif"
);
warnMapping.set(
  "WRAINA",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/raina.gif"
);
warnMapping.set(
  "WRAINR",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/rainr.gif"
);
warnMapping.set(
  "WRAINB",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/rainb.gif"
);
warnMapping.set(
  "WFNTSA",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/ntfl.gif"
);
warnMapping.set(
  "WL",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/landslip.gif"
);
warnMapping.set(
  "TC1",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/tc1.gif"
);
warnMapping.set(
  "TC3",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/tc3.gif"
);
warnMapping.set(
  "TC8NE",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/tc8ne.gif"
);
warnMapping.set(
  "TC8SE",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/tc8se.gif"
);
warnMapping.set(
  "TC8NW",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/tc8nw.gif"
);
warnMapping.set(
  "TC8SW",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/tc8sw.gif"
);
warnMapping.set(
  "TC9",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/tc9.gif"
);
warnMapping.set(
  "TC10",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/tc10.gif"
);
warnMapping.set(
  "WTMW",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/tsunami-warn.gif"
);
warnMapping.set(
  "WTS",
  "https://www.hko.gov.hk/tc/textonly/img/warn/images/ts.gif"
);

const WeatherWarn = () => {
  const [warns, setWarns] = useState([]);
  const [firstCall, setFirstCall] = useState(50);

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await fetch(
        "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=tc"
      );
      const resData = await response.json();
      const warnsData = [];
      for (var i in resData) {
        warnsData.push(resData[i]);
      }
      const codes = warnsData.map((warnData) => warnData.code);
      setWarns(codes);
      if (firstCall !== 300000) setFirstCall(300000);
    }, firstCall);
    return () => clearInterval(interval);
  }, [firstCall]);

  return (
    <div className={classes.weatherWarn}>
      {warns.map((warn) => (
        <img key={warn} src={warnMapping.get(warn)} alt="warn" />
      ))}
    </div>
  );
};

export default WeatherWarn;
