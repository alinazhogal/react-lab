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

class MainApp extends Component<
  unknown,
  { hasError: boolean; userName: string; isAuth: boolean; signInOpen: boolean }
> {
  constructor(props: unknown) {
    super(props);
    this.state = { hasError: false, userName: "", isAuth: false, signInOpen: false };

    this.logInUser = this.logInUser.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
    this.setModalState = this.setModalState.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  setModalState(state: boolean) {
    this.setState({ signInOpen: state });
  }

  logInUser(login: string) {
    this.setState({ userName: login, isAuth: true });
  }

  logOutUser() {
    this.setState({ isAuth: false });
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
        <BrowserRouter>
          <Header
            logIn={this.logInUser}
            username={this.state.userName}
            isAuth={this.state.isAuth}
            logOut={this.logOutUser}
            setSignInOpen={this.setModalState}
            signInOpen={this.state.signInOpen}
          />
          <Routes>
            <Route path={pageLinks.home} element={<Home />} />
            <Route
              path={pageLinks.products}
              element={
                <PrivateRoute isAuth={this.state.isAuth} logIn={this.logInUser} setSignInOpen={this.setModalState}>
                  <Products />
                </PrivateRoute>
              }
            >
              <Route path={`${pageLinks.products}/:category`} element={<Products />} />
            </Route>
            <Route
              path={pageLinks.about}
              element={
                <PrivateRoute isAuth={this.state.isAuth} logIn={this.logInUser} setSignInOpen={this.setModalState}>
                  <About />
                </PrivateRoute>
              }
            />
            <Route
              path={pageLinks.profile}
              element={
                <PrivateRoute isAuth={this.state.isAuth} logIn={this.logInUser} setSignInOpen={this.setModalState}>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to={pageLinks.home} />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </StrictMode>
    );
  }
}

ReactDom.render(<MainApp />, document.getElementById("app"));
