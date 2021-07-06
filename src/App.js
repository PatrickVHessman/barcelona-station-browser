
import './App.css';
import StationList from './components/StationList';

function App() {
  return (
    <div className="App">
      <h1>Barcelona Bike Station Browser</h1>
      <p>Demo application to show proficiency with React and GraphQL. Powered by the <a
        href="https://github.com/aalises/barcelona-urban-mobility-graphql-api"
        target="_blank"
        rel="noopener noreferrer"
      >Barcelona Urban Mobility API</a> and <a
        href="https://leafletjs.com/"
        target="_blank"
        rel="noopener noreferrer"
      >Leaflet</a>.</p>
      <StationList />
      <footer>
      Created by{" "}
      <a
        href="http://patrickvhessman.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Patrick Hessman
      </a>{" "}
      | View{" "}
      <a
        href="https://github.com/PatrickVHessman/barcelona-station-browser"
        target="_blank"
        rel="noopener noreferrer"
      >
        source
      </a>
    </footer>
    </div>
  );
}

export default App;
