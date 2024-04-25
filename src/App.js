import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from "./components/Landingpage";
import Example from "./pages/form/form";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/form" element={<Example />} />
      </Routes>
    </Router>
  );
}

export default App;
