import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("the counter starts at 0", () => {
  render(<App />);
  const counterElement = screen.getByTestId("counter");
  expect(counterElement).toHaveTextContent("0");
});

test("minus button has correct text", () => {
  render(<App />);
  const minusButton = screen.getByTestId("minus-button");
  expect(minusButton).toHaveTextContent("-");
});

test("plus button has correct text", () => {
  render(<App />);
  const plusButton = screen.getByTestId("plus-button");
  expect(plusButton).toHaveTextContent("+");
});

test("when minus button is clicked, counter decrements", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("minus-button");
  const counterElement = screen.getByTestId("counter");
  fireEvent.click(buttonElement);
  expect(counterElement).toHaveTextContent(-1);
});

test("when plus button is clicked, counter increase", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("minus-button");
  const counterElement = screen.getByTestId("counter");
  fireEvent.click(buttonElement);
  expect(counterElement).toHaveTextContent(1);
});

test("on/off button has blue color", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("on-off-button");
  expect(buttonElement).toHaveStyle("background-color: blue");
});

test("Prevent -, + button from being pressed when the on/off button is clicked", () => {
  render(<App />);
  const onOffButton = screen.getByTestId("on-off-button");
  const minusButton = screen.getByTestId("minus-button");
  const plusButton = screen.getByTestId("plus-button");
  fireEvent.click(onOffButton);
  expect(minusButton).toBeDisabled();
  expect(plusButton).toBeDisabled();
});
