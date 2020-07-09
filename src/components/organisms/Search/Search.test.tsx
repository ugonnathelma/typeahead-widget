import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Search from "./index";
import { withThemeProvider } from "utils/tests";

test("renders TextField", () => {
  const { queryByPlaceholderText, getByTestId } = render(
    withThemeProvider(<Search />)
  );

  expect(getByTestId(/search-field/)).toBeInTheDocument();

  expect(queryByPlaceholderText(/Search fruit/)).toBeInTheDocument();
});

test("renders 'You are searching for ... ?' when no search query", () => {
  const { getByTestId } = render(withThemeProvider(<Search />));

  expect(getByTestId(/search-value-text/).textContent).toEqual(
    "You are searching for ... ?"
  );
});

test("renders 'You are searching for apple' when apple is the search query", () => {
  const { getByTestId } = render(withThemeProvider(<Search />));

  fireEvent.change(getByTestId(/search-field/), { target: { value: "apple" } });

  expect(getByTestId(/search-value-text/).textContent).toEqual(
    "You are searching for apple"
  );
});

test("renders suggestions: apple, crab apples, pineapple, star apple when apple is the search query", () => {
  const { getByTestId } = render(withThemeProvider(<Search />));

  const suggestionBoxElement = getByTestId(/suggestion-box/);
  const suggestions = suggestionBoxElement.children;

  fireEvent.change(getByTestId(/search-field/), { target: { value: "apple" } });

  expect(suggestionBoxElement.childElementCount).toEqual(4);

  expect(suggestions[0].textContent).toEqual("apple");

  expect(suggestions[1].textContent).toEqual("crab apples");

  expect(suggestions[2].textContent).toEqual("pineapple");

  expect(suggestions[3].textContent).toEqual("star apple");
});

test("renders suggestions: star apple, star fruit when star is the search query", () => {
  const { getByTestId } = render(withThemeProvider(<Search />));

  const suggestionBoxElement = getByTestId(/suggestion-box/);
  const suggestions = suggestionBoxElement.children;

  fireEvent.change(getByTestId(/search-field/), { target: { value: "star" } });

  expect(suggestionBoxElement.childElementCount).toEqual(2);

  expect(suggestions[0].textContent).toEqual("star apple");

  expect(suggestions[1].textContent).toEqual("star fruit");
});

test("renders no suggestions search query does not match any entries", () => {
  const { getByTestId } = render(withThemeProvider(<Search />));
  const suggestionBoxElement = getByTestId(/suggestion-box/);
  const searchField = getByTestId(/search-field/);

  fireEvent.change(searchField, { target: { value: "start" } });
  expect(suggestionBoxElement.childElementCount).toEqual(0);

  fireEvent.change(searchField, { target: { value: "pet" } });
  expect(suggestionBoxElement.childElementCount).toEqual(0);
});

test("renders unchanged suggestions when search query length is less than 3", () => {
  const { getByTestId } = render(withThemeProvider(<Search />));
  const suggestionBoxElement = getByTestId(/suggestion-box/);
  const searchField = getByTestId(/search-field/);

  fireEvent.change(searchField, { target: { value: "st" } });
  expect(suggestionBoxElement.childElementCount).toEqual(0);

  fireEvent.change(searchField, { target: { value: "pine" } });
  expect(suggestionBoxElement.childElementCount).toEqual(2);

  fireEvent.change(searchField, { target: { value: "pi" } });
  expect(suggestionBoxElement.childElementCount).toEqual(2);
});

test("temporarily renders suggestion in text field when hovering over it", () => {
  const { getByTestId } = render(withThemeProvider(<Search />));
  const suggestionBoxElement = getByTestId(/suggestion-box/);
  const searchField = getByTestId(/search-field/) as HTMLInputElement;
  const suggestions = suggestionBoxElement.children;

  fireEvent.change(searchField, { target: { value: "star" } });
  expect(searchField.value).toEqual("star");

  fireEvent.mouseEnter(suggestions[0]);
  expect(searchField.value).toEqual("star apple");

  fireEvent.mouseLeave(suggestions[0]);
  expect(searchField.value).toEqual("star");
});

test("changes searchValue on suggestion click", () => {
  const { getByTestId } = render(withThemeProvider(<Search />));
  const suggestionBoxElement = getByTestId(/suggestion-box/);
  const searchField = getByTestId(/search-field/);
  const suggestions = suggestionBoxElement.children;

  fireEvent.change(searchField, { target: { value: "star" } });
  expect(getByTestId(/search-value-text/).textContent).toEqual(
    "You are searching for star"
  );

  fireEvent.mouseEnter(suggestions[0]);
  fireEvent.click(suggestions[0]);
  expect(getByTestId(/search-value-text/).textContent).toEqual(
    "You are searching for star apple"
  );
});

test("changes searchValue on keydown on suggestion", () => {
  const { getByTestId } = render(withThemeProvider(<Search />));
  const suggestionBoxElement = getByTestId(/suggestion-box/);
  const searchField = getByTestId(/search-field/);
  const suggestions = suggestionBoxElement.children;

  fireEvent.change(searchField, { target: { value: "star" } });
  expect(getByTestId(/search-value-text/).textContent).toEqual(
    "You are searching for star"
  );

  fireEvent.keyDown(suggestions[0], {
    keyCode: 40,
  });

  fireEvent.keyDown(suggestions[0], {
    keyCode: 13,
  });
  expect(getByTestId(/search-value-text/).textContent).toEqual(
    "You are searching for star apple"
  );
});
