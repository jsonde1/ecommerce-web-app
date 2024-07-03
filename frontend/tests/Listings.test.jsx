import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Listings from "../src/components/Listings.jsx";
import { describe, test, expect, beforeEach, vi, waitFor } from "vitest";

describe(`Form test suite`, () => {
  beforeEach(() => {
    const res = [
      {
        id: 1,
        Title: "Test Listing",
        Condition: "New",
        Price: 200,
        Description: "Test Description",
        UserID: 1,
        MainImage: "Test Image",
        CreationDate: "2021-09-20T00:00:00.000Z",
        Status: "Sold",
        Name: "Tester Man",
        PhoneNumber: "0947883945",
      },
    ];
    render(<Listings data={res} />);
  });

  describe(`form render tests`, () => {
    test(`it should render Search form component`, () => {
      expect(screen.getByText("Listings")).toBeInTheDocument();
    });

    test(`it should render search button`, async () => {
      expect(await screen.getByAltText("Card image cap")).toBeInTheDocument();
    });
  });
});
