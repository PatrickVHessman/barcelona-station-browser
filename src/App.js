
import './App.css';
import StationList from './components/StationList';

function App() {
  return (
    <div className="App">
      <h1>Barcelona Metro and Bike Stations</h1>
      <p>Demo application to show proficiency with React and GraphQL. Powered by the <a
        href="https://github.com/aalises/barcelona-urban-mobility-graphql-api"
        target="_blank"
        rel="noopener noreferrer"
      >Barcelona Urban Mobility API</a>.</p>
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
        href=""
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
