import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import React from "react";
import Home from "./components/Home";
import Whiteboard from "./components/Whiteboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/whiteboard:id" element={<Whiteboard />} /> */}
        <Route path="/whiteboard" element={<Whiteboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
