import "./styles/main.scss";
import { StrictMode } from "react";
import ReactDom from "react-dom";
import "./styles/main.module.css";
import Header from "src/components/header/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./components/products";
import About from "./components/about";
import Home from "./components/home";
import pageLinks from "./routesLinks";

function AppContainer() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={pageLinks.home} element={<Home />} />
          <Route path={pageLinks.products} element={<Products />} />
          <Route path={pageLinks.about} element={<About />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
