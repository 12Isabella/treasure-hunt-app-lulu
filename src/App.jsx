import "./App.css";

function App() {
  function getLocation() {
    function success(pos) {
      let coordinates = pos.coords;
      console.log(coordinates);
      let latUser = coordinates.latitude;
      console.log(latUser);
      let lonUser = coordinates.longitude;
      console.log(lonUser);
    }
    navigator.geolocation.getCurrentPosition(success);
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
      <h3>Du vet hvor du skal? Gå, gå, gå!</h3>
      <h2>Du er på riktig sted? Trykk på knappen! Let's see...</h2>
      <a href="/" className="btn btn-warning mt-3" onClick={checkLocation}>
        I got it!
      </a>
    </div>
  );
}

export default App;
