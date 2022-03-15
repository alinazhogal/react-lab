import "./styles/main.scss";
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import style from "./styles/main.module.css";

interface AppProps {
  nothing: boolean;
}

interface AppState {
  title: string;
}

class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);
    // test class-dead-code
    const goExlcude = true;
    if (!goExlcude) {
      console.warn("class-dead-code doesn't work");
    }
  }

  render() {
    return (
      <StrictMode>
        <div className="test-block" />
        <div className={["test-block", style.background].join(" ")}>
          <h2>Hello world</h2>
        </div>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
