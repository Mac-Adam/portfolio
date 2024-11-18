import Three from "./Three";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  useEffect(() => {
    document.title = "Portfolio";
    document.documentElement.style.fontSize = "2vh"; // Example
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Three />} />
      </Routes>
    </Router>
  );
}

export default App;
