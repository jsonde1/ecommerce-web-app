import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MainSearch from "../src/pages/MainSearch.jsx";
import { describe, test, expect, beforeEach, vi } from "vitest";

describe(`Form test suite`, () => {
  const listingHandler = vi.fn();
  beforeEach(() => {
    render(<MainSearch getListings={listingHandler} />);
  });

  describe(`form render tests`, () => {
    test(`it should render Search form component`, () => {
      expect(
        screen.getByPlaceholderText(/Search for .../i)
      ).toBeInTheDocument();
    });

    test(`it should render search button`, () => {
      expect(screen.getByRole(`button`)).toBeInTheDocument();
    });
  });
});
