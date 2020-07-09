import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders Search Componenet", () => {
  const { getByTestId } = render(<App />);

  const searchElement = getByTestId(/search-component/);
  expect(searchElement).toBeInTheDocument();
});
