import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Internships from "./Internships";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/internships">Internships</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/internships" element={<Internships />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;