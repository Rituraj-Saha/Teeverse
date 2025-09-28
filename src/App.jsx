import { React } from "react";
import "./App.css";
import Nav from "./components/navigationBar/Nav";
import Home from "./components/home/Home";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, Divider, ThemeProvider } from "@mui/material";
import theme, { injectCssVariables } from "./theme/theme";
import { Routes, Route } from "react-router-dom";
import Admin from "./admin/admin";
function App() {
  injectCssVariables(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Nav />
      <div
        style={{
          marginTop: "8vh",
        }}
      >
        <Divider
          component="div"
          variant="middle"
          sx={{ border: "0.2 solid", borderColor: "#FFF" }}
          orientation="horizontal"
        />

        <BrowserRouter>
          {/* <Home /> */}
          <Routes>
            {" "}
            {/* 👈 Wrap all individual routes */}
            <Route path="/" element={<Home />} />{" "}
            <Route path="/admin" element={<Admin />} />
            {/* Renders <Home /> for the root path */}
            {/* <Route path="/about" element={<About />} />{" "} */}
            {/* Renders <About /> for /about */}
            {/* <Route path="/contact" element={<Contact />} />{" "} */}
            {/* Renders <Contact /> for /contact */}
            <Route path="*" element={<h1>404: Page Not Found</h1>} />{" "}
            {/* Optional: Catch-all for unknown paths */}
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
