import React from "react";
import Home from "./pages/home";
import Navbar from "./components/nav";
import News from "./components/Feed";

function App() {
    
    return (
        <>
          <Navbar/>
          <Home/>
          <News/>
        </>
    );
}

export default App;
