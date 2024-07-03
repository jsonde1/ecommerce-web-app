import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, beforeEach, vi } from "vitest";
import ModifyListing from "../src/components/ModifyListing.jsx";

describe(`Form test suite`, () => {
  beforeEach(() => {
    const res = {
      id: 1,
      Title: "Test Listing",
      Condition: "New",
      Price: 200,
      Description: "Test Description",
      UserID: 1,
      MainImage: "Test Image",
      CreationDate: "2021-09-20T00:00:00.000Z",
      Status: "Sold",
      modifyListing: vi.fn(),
      deleteListing: vi.fn(),
    };

    render(<ModifyListing listing={res} />);
  });
  describe(`form render tests`, () => {
    test(`form should be prerendered with listing data`, () => {
      const itemInput = screen.getByPlaceholderText(/Name of your item/i);
      expect(itemInput).toHaveValue("Test Listing");
    });
    test(`it should render the new value in the input when the Price field is is updated`, async () => {
      const testItemSearch = `Tester`;
      const itemInput = screen.getByPlaceholderText(
        /Brief description of your item/i
      );

      expect(itemInput).toHaveValue(`Test Description`);

      await userEvent.clear(itemInput);
      await userEvent.type(itemInput, testItemSearch);

      expect(itemInput).toHaveValue(testItemSearch);
    });

    test.skip(`it should render search button`, async () => {
      expect(await screen.getByAltText("Card image cap")).toBeInTheDocument();
    });
  });
});
