import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Nav from "./components/navigationBar/nav";
import Hero from "./components/home/heroSection/Hero";
import Home from "./components/home/Home";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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
