import "./App.css";
import BusSchedule from "./BusSchedule/BusSchedule";
import Clock from "./Clock/Clock";
import Weather from "./Weather/Weather";

function App() {
  return (
    <div className="app">
      <div className="top">
        <Clock />
      </div>
      <div className="bottom">
        <Weather />
        <BusSchedule />
      </div>
    </div>
  );
}

export default App;
