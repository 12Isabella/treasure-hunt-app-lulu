import "./App.css";
import locations from "./locations";
import { useState } from "react";

function App() {
  let [locationIndex, setLocationIndex] = useState(0);
  const currentLocation = locations[locationIndex];
  function compareLocation(userLocationLat, userLocationLon) {
    let northWestLat = currentLocation.coordinates.northWest.lat;
    let northWestLon = currentLocation.coordinates.northWest.lon;
    let southEastLat = currentLocation.coordinates.southEast.lat;
    let southEastLon = currentLocation.coordinates.southEast.lon;

    if (
      userLocationLat >= southEastLat &&
      userLocationLat <= northWestLat &&
      userLocationLon <= southEastLon &&
      userLocationLon >= northWestLon
    ) {
      alert("true");
      if (locationIndex < locations.length - 1) {
        setLocationIndex(locationIndex + 1);
      } else {
        setLocationIndex(0);
      }
    } else {
      alert("Du er på feil sted.");
      return false;
    }
  }

  function getLocation() {
    function handleCoords(pos) {
      let coordinates = pos.coords;

      const userLocationLat = coordinates.latitude;

      const userLocationLon = coordinates.longitude;

      compareLocation(userLocationLat, userLocationLon);
    }
    navigator.geolocation.getCurrentPosition(handleCoords);
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
      <p>{currentLocation.info}</p>
      <img
        src={currentLocation.image}
        alt={currentLocation.name}
        width="300px"
      />
      <h3 className="mt-2">Du vet hvor du skal? Gå, gå, gå!</h3>
      <h2>Du er på riktig sted? Trykk på knappen! Let's see...</h2>
      <a href="/" className="btn btn-warning mt-3 mb-3" onClick={checkLocation}>
        I got it!
      </a>
    </div>
  );
}

export default App;
