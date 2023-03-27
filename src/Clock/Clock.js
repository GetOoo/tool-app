import { useState, useEffect } from "react";
import classes from "./Clock.module.css";

const Clock = () => {
  const [time, setTime] = useState("0000");
  const [seconds, setSeconds] = useState("00");
  // const [AM, setAM] = useState("AM");
  // const [hour12, setHour12] = useState(false);
  const [date, setDate] = useState("2023年1月1日");
  const [weekday, setWeekday] = useState("星期日");

  useEffect(() => {
    const interval = setInterval(() => {
      const newDate = new Date();
      // const hours = hour12
      //   ? (newDate.getHours() % 12 || 12).toString().padStart(2, "0") +
      //     ":" +
      //     newDate.getMinutes().toString().padStart(2, "0")
      //   : ;
      let hours = newDate.getHours().toString();
      hours = hours.length === 1 ? "0" + hours : hours;
      let minutes = newDate.getMinutes().toString();
      minutes = minutes.length === 1 ? "0" + minutes : minutes;
      const newTime = hours + minutes;
      setTime(newTime);
      setSeconds(newDate.getSeconds().toString().padStart(2, "0"));
      // setAM(newDate.getHours() < 12 ? "AM" : "PM");
      setDate(newDate.toLocaleString("zh-tw", { dateStyle: "long" }));
      setWeekday(newDate.toLocaleString("zh-tw", { weekday: "long" }));
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  // const onChangeHour12 = () => {
  //   setHour12(!hour12);
  // };

  return (
    <div className={classes.clock}>
      {/* <button onClick={onChangeHour12}>{hour12 ? AM : "xxx"}</button>
      <div>{seconds}</div> */}
      <div className={classes.top}>
        <div>{date}</div>
        <div>{weekday}</div>
      </div>
      <div className={classes.time}>
        <div>{time.charAt(0)}</div>
        <div>{time.charAt(1)}</div>
        <div style={{ width: "10vw", textAlign: "center" }}>:</div>
        <div>{time.charAt(2)}</div>
        <div>{time.charAt(3)}</div>
      </div>
    </div>
  );
};

export default Clock;
