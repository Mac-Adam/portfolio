import Three from "./Three";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Portfolio";
  }, []);
  return (
    <div>
      <header>
        <Three />
      </header>
    </div>
  );
}

export default App;
