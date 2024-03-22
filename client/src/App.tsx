import React, { useContext, useState } from "react";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./userContext";
import { userType } from "./userContext";
import Home from "./components/Home";

function App() {
  const [user, setUser] = useState<userType|null>(null);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
