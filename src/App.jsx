import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Nav from "./components/navigationBar/nav";
import Hero from "./components/home/heroSection/Hero";
import Home from "./components/home/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Nav />
      <div>
        <Home />
      </div>
    </>
  );
}

export default App;
