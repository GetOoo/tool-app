import Destination from "./Destination";
import classes from "./BusSchedule.module.css";

const BusStops = [
  {
    stop_id: "D56D56E9F6458361",
    dest: "大埔",
  },
  {
    stop_id: "61316B564DD5D47B",
    dest: "元朗",
  },
];

const BusSchedule = () => {
  return (
    <div className={classes.BusSchedule}>
      <Destination busStop={BusStops[0]} />
      <Destination busStop={BusStops[1]} />
    </div>
  );
};

export default BusSchedule;
