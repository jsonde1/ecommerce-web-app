import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddListing from "../src/components/AddListing.jsx";
import { describe, test, expect, beforeEach, vi } from "vitest";

describe(`Form test suite`, () => {
  const appendListing = vi.fn();
  beforeEach(() => {
    render(<AddListing appendListing={appendListing} />);
  });

  describe(`form render tests`, () => {
    test(`it should render add listing component`, () => {
      expect(screen.getByText("New")).toBeInTheDocument();
    });
    test(`it should render the new value in the input when the Title field is is updated`, async () => {
      const testItemSearch = `Tester`;
      const itemInput = screen.getByPlaceholderText(
        /Brief description of your item/i
      );

      expect(itemInput).toHaveValue(``);

      await userEvent.type(itemInput, testItemSearch);

      expect(itemInput).toHaveValue(testItemSearch);
    });

    test.skip(`it should render search button`, async () => {
      expect(await screen.getByAltText("Card image cap")).toBeInTheDocument();
    });
  });
});
