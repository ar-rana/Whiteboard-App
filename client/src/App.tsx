import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import React from "react";
import Home from "./Pages/Home";
import Whiteboard from "./Pages/Whiteboard";
import Modal from "./components/Modal";
import BoardWrapper from "./Pages/BoardWrapper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whiteboard/:id" element={<BoardWrapper />} />
        {/* <Route path="/whiteboard" element={<Whiteboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
