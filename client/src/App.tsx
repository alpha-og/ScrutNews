import React from "react";
import Home from "./pages/home";
import Navbar from "./components/nav";
import { Routes, Route } from "react-router-dom";
import News from "./pages/news";

function App() {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </div>
  );
}

export default App;
