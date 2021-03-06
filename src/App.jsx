import "./App.css";
import locations from "./locations";
import { useState } from "react";

function App() {
  const [locationIndex, setLocationIndex] = useState(function () {
    const locationIndexJSON = window.localStorage.getItem("location") || "0";
    return parseInt(locationIndexJSON);
  });
  const [backgroundGradient, setBackgroundGradient] = useState("gradient0");

  const currentLocation = locations[locationIndex];

  function compareLocation(position, coordinates) {
    return (
      position.lat >= coordinates.southEast.lat &&
      position.lat <= coordinates.northWest.lat &&
      position.lon <= coordinates.southEast.lon &&
      position.lon >= coordinates.northWest.lon
    );
  }

  function getLocation() {
    function handleCoords(pos) {
      let coordinates = pos.coords;

      const userLocation = {
        lat: coordinates.latitude,
        lon: coordinates.longitude,
      };

      let foundLocation = null;

      locations.forEach(function (location) {
        if (compareLocation(userLocation, location.coordinates)) {
          foundLocation = location;
          // set location in local storage so user can see clues even while being at the wrong place.

          window.localStorage.setItem("location", foundLocation.index + 1);
        }
      });

      if (foundLocation !== null) {
        if (foundLocation.index === locations.length - 1) {
          setLocationIndex(locations.length - 1);
          console.log("User is at end loactaion.");
        } else if (foundLocation.index < locations.length - 1) {
          setLocationIndex(foundLocation.index + 1);
          console.log("User is at " + foundLocation.name);
        }
      } else {
        alert("Du er på feil sted.");
        console.log("User is not at any of these locations.");
      }
    }
    navigator.geolocation.getCurrentPosition(handleCoords);
  }

  function checkLocation(event) {
    event.preventDefault();

    // update backgroundGradient
    setBackgroundGradient(
      `gradient${Math.floor(Math.random() * locations.length)}`
    );

    getLocation();
  }
  return (
    <div className="App">
      <div className={`container ${backgroundGradient}`}>
        <h1 className="mt-3">Velkommen til Oslo!</h1>
        <h2>Her er dine clues for å finne stedet du skal til...</h2>
        <p>{currentLocation.info}</p>
        <img
          src={currentLocation.image}
          alt={currentLocation.name}
          width="300px"
          className="image"
        />
        <h3 className="mt-2">Du vet hvor du skal? Gå, gå, gå!</h3>
        <h2>Du er på riktig sted? Trykk på knappen! Let's see...</h2>
        <a
          href="/"
          className="btn btn-warning mt-3 mb-3"
          onClick={checkLocation}
        >
          I got it!
        </a>
      </div>
    </div>
  );
}

export default App;
