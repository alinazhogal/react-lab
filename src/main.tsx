import { Component, ErrorInfo, StrictMode } from "react";
import ReactDom from "react-dom";
import "./styles/main.scss";
import { Provider } from "react-redux";
import Button from "./elements/button";
import { store } from "./redux";
import Routes from "./Routes";

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
        <Provider store={store}>
          <Routes />
        </Provider>
      </StrictMode>
    );
  }
}

ReactDom.render(<MainApp />, document.getElementById("app"));
