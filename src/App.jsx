import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Nav from "./components/navigationBar/Nav";
import Hero from "./components/home/heroSection/Hero";
import Home from "./components/home/Home";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import GrainyGradiant from "./reusableComponent/backgroundGrainyGrad/GrainyGradiant";
import { CssBaseline, Divider, ThemeProvider } from "@mui/material";
import theme, { injectCssVariables } from "./theme/theme";

function App() {
  const [count, setCount] = useState(0);
  injectCssVariables(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GrainyGradiant>
        <Nav />
        <Divider
          component="div"
          variant="middle"
          sx={{ border: "0.2 solid", borderColor: "#FFF" }}
          orientation="horizontal"
        />
        <Hero />
      </GrainyGradiant>

      <Home />
    </ThemeProvider>
  );
}

export default App;
