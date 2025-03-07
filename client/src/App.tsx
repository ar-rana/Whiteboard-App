import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import React from "react";
import Home from "./Pages/Home";
import Whiteboard from "./Pages/Whiteboard";
import Modal from "./components/Modal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whiteboard/:id" element={<Whiteboard />} />
        {/* <Route path="/whiteboard" element={<Whiteboard />} /> */}
        <Route path="/ask" element={<Modal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
