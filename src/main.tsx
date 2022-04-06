import { Component, StrictMode, ErrorInfo } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/main.scss";
import Header from "src/components/header/header";
import Products from "./components/products/products";
import About from "./components/about";
import Home from "./components/home";
import pageLinks from "./routesLinks";
import Footer from "./components/footer/footer";
import Button from "./elements/button";
import Profile from "./components/profile";
import PrivateRoute from "./components/privateRoute";
import AuthProvider from "./context";

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
          <Button onClick={this.redirect} title="Return to home page" />
        </div>
      );
    return (
      <StrictMode>
        <AuthProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path={pageLinks.home} element={<Home />} />
              <Route
                path={pageLinks.products}
                element={
                  <PrivateRoute>
                    <Products />
                  </PrivateRoute>
                }
              >
                <Route path={`${pageLinks.products}/:category`} element={<Products />} />
              </Route>
              <Route
                path={pageLinks.about}
                element={
                  <PrivateRoute>
                    <About />
                  </PrivateRoute>
                }
              />
              <Route
                path={pageLinks.profile}
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to={pageLinks.home} />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </AuthProvider>
      </StrictMode>
    );
  }
}

ReactDom.render(<MainApp />, document.getElementById("app"));
