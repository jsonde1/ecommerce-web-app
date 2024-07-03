import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchForm from "../src/components/SearchForm.jsx";
import { describe, test, expect, beforeEach, vi } from "vitest";

const listingHandler = vi.fn();
beforeEach(() => {
  render(<SearchForm getListings={listingHandler} />);
});
test(`it should render the new value in the input when the search field is is updated`, async () => {
  const testItemSearch = `Tester`;
  const itemInput = screen.getByPlaceholderText(/Search for .../i);

  expect(itemInput).toHaveValue(``);

  await userEvent.type(itemInput, testItemSearch);

  expect(itemInput).toHaveValue(testItemSearch);
});
test(`it should call getListings when submit is clicked`, async () => {
  const testItemSearch = `Test Location`;
  const itemInput = screen.getByPlaceholderText(/Search for .../i);
  const submitBtn = screen.getByRole(`button`);
  await userEvent.type(itemInput, testItemSearch);
  await userEvent.click(submitBtn);
  expect(listingHandler).toHaveBeenCalledTimes(1);
});
