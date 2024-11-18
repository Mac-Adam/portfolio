import Three from "./Three";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Portfolio";
    document.documentElement.style.fontSize = "2vh"; // Example
  }, []);
  return (
    <div>
      <header style={{ backgroundColor: "black" }}>
        <Three />
      </header>
    </div>
  );
}

export default App;
