import { useEffect, useState } from "react";
import classes from "./Destination.module.css";

const Destination = (props) => {
  const stop_id = props.busStop.stop_id;
  const [timeDiff, setTimeDiff] = useState(["-", "-", "-"]);
  const [firstCall, setFirstCall] = useState(50);

  function getMinDiff(startDate, endDate) {
    const msInMinute = 60 * 1000;
    let minDiff = Math.round(Math.abs(endDate - startDate) / msInMinute);
    minDiff = minDiff < 60 && minDiff > 0 ? minDiff : "-";
    return minDiff;
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await fetch(
        `https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/${stop_id}`
      );
      const resData = await response.json();
      const t0 = new Date();
      const t1 = new Date(resData.data[0].eta);
      const t2 = new Date(resData.data[1].eta);
      const t3 = new Date(resData.data[2].eta);
      let td1 = getMinDiff(t0, t1);
      let td2 = getMinDiff(t0, t2);
      let td3 = getMinDiff(t0, t3);

      setTimeDiff([td1, td2, td3]);
      if (firstCall !== 10000) setFirstCall(10000);
    }, firstCall);
    return () => clearInterval(interval);
  }, [firstCall, stop_id]);
  return (
    <div className={classes.destination}>
      <div className={classes.title}>{props.busStop.dest}</div>
      <div className={classes.first}>
        {timeDiff[0]}
        <span style={{ fontSize: "3.5vw" }}>分鐘</span>
      </div>
      <div className={classes.next}>
        <div>
          {timeDiff[1]}
          <span style={{ fontSize: "2vw" }}>分鐘</span>
        </div>
        <div>
          {timeDiff[2]}
          <span style={{ fontSize: "2vw" }}>分鐘</span>
        </div>
      </div>
    </div>
  );
};
export default Destination;
