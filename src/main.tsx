import "./styles/main.scss";
import { StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/main.module.css";
import Header from "src/components/header/header";
import Products from "./components/products";
import About from "./components/about";
import Home from "./components/home";
import pageLinks from "./routesLinks";
import Footer from "./components/footer/footer";

function AppContainer() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={pageLinks.home} element={<Home />} />
          <Route path={pageLinks.products} element={<Products />} />
          <Route path={pageLinks.about} element={<About />} />
          <Route path="*" element={<Navigate to={pageLinks.home} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </StrictMode>
  );
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
