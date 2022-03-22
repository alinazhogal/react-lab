import { Component, StrictMode, ErrorInfo } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/main.scss";
import "./styles/main.module.css";
import Header from "src/components/header/header";
import Products from "./components/products/products";
import About from "./components/about";
import Home from "./components/home";
import pageLinks from "./routesLinks";
import Footer from "./components/footer/footer";

class MainApp extends Component<unknown, { hasError: boolean }> {
  constructor(props: unknown) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  redirect() {
    window.location.assign("/home");
  }

  render() {
    if (this.state.hasError)
      return (
        <div className="error">
          <h3>Something went wrong</h3>
          <button type="button" onClick={this.redirect}>
            Return to home page
          </button>
        </div>
      );
    return (
      <StrictMode>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={pageLinks.home} element={<Home />} />
            <Route path={pageLinks.products} element={<Products />} />
            <Route path={`${pageLinks.products}/:category`} element={<Products />} />
            <Route path={pageLinks.about} element={<About />} />
            <Route path="*" element={<Navigate to={pageLinks.home} />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </StrictMode>
    );
  }
}

ReactDom.render(<MainApp />, document.getElementById("app"));
