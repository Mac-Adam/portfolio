import "./App.css";
import Three from "./Three";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Portfolio";
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <Three />
      </header>
    </div>
  );
}

export default App;
