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

class MainApp extends Component<unknown, { hasError: boolean; userName: string; isAuth: boolean }> {
  constructor(props: unknown) {
    super(props);
    this.state = { hasError: false, userName: "", isAuth: false };

    this.logInUser = this.logInUser.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
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

  logInUser(login: string) {
    this.setState({ userName: login, isAuth: true });
  }

  logOutUser() {
    this.setState({ isAuth: false });
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
        <BrowserRouter>
          <Header
            auth={this.logInUser}
            username={this.state.userName}
            isAuth={this.state.isAuth}
            logOut={this.logOutUser}
          />
          <Routes>
            <Route path={pageLinks.home} element={<Home />} />
            <Route path={pageLinks.products} element={<Products />}>
              <Route path={`${pageLinks.products}/:category`} element={<Products />} />
            </Route>
            <Route path={pageLinks.about} element={<About />} />
            <Route path={pageLinks.profile} element={<Profile />} />
            <Route path="*" element={<Navigate to={pageLinks.home} />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </StrictMode>
    );
  }
}

ReactDom.render(<MainApp />, document.getElementById("app"));
