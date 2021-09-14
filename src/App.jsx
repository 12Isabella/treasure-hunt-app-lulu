import "./App.css";
import { useState } from "react";

function App() {
  let [userLocationLat, setUserLocationLat] = useState("unknown");
  let [userLocationLon, setUserLocationLon] = useState("unknown");

  function compareLocation() {
    let pointAlat = 59.90867924548992;
    let pointAlon = 10.749348866894646;
    let pointBlat = 59.906426634818516;
    let pointBlon = 10.754803936197451;
    if (
      userLocationLat >= pointBlat &&
      userLocationLat <= pointAlat &&
      userLocationLon <= pointBlon &&
      userLocationLon >= pointAlon
    ) {
      return alert("true");
    } else {
      return alert("nope");
    }
  }

  function getLocation() {
    function success(pos) {
      let coordinates = pos.coords;
      console.log(coordinates);
      setUserLocationLat(coordinates.latitude);
      console.log(userLocationLat);
      setUserLocationLon(coordinates.longitude);
      console.log(userLocationLon);
    }
    navigator.geolocation.getCurrentPosition(success);
    compareLocation();
  }

  function checkLocation(event) {
    event.preventDefault();
    alert("Checking your location...");
    getLocation();
  }
  return (
    <div className="App">
      <h1 className="mt-3">Velkommen til Oslo!</h1>
      <h2>Her er dine clues for å finne stedet du skal til...</h2>
      <p>Du skal til Operahuset.</p>
      <img src=" /OsloOpera.jpg" alt="OsloOpera" width="300px" />
      <h3 className="mt-2">Du vet hvor du skal? Gå, gå, gå!</h3>
      <h2>Du er på riktig sted? Trykk på knappen! Let's see...</h2>
      <a href="/" className="btn btn-warning mt-3 mb-3" onClick={checkLocation}>
        I got it!
      </a>
    </div>
  );
}

export default App;
