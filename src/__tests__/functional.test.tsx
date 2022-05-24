import { BrowserRouter } from "react-router-dom";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux";
import Profile from "../components/profile/profile";
import NavBar from "../components/header/navbar";

afterEach(cleanup);

it("profile save changes button enabled on input", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Profile />
      </Provider>
    </BrowserRouter>
  );
  const saveButton = await screen.findByText("Save changes");
  expect(saveButton).toBeDisabled();
  fireEvent.input(screen.getByLabelText("Phone"), { target: { value: "4445" } });
  expect(saveButton).toBeEnabled();
});

it("shows categories", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <NavBar />
      </Provider>
    </BrowserRouter>
  );
  const categories = screen.getByTestId("display-categories");
  const products = screen.getAllByText("Products")[0];
  fireEvent.mouseEnter(products);
  expect(categories).toBeVisible();
});
